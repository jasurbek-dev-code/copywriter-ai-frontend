import { useCallback, useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import toast from "react-hot-toast";

export interface User {
  email: string;
  _id: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  _id: string;
  title: string;
  messages: Message[];
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Chat | null>(null);
  const [history, setHistory] = useState<Chat[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el && loading) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chat?.messages, loading]);
  const fetchUser = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  }, [token]);

  const createNewChat = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "New Chat",
        messages: [],
      }),
    });
    const data = await res.json();
    setChat(data);
  }, [token]);

  const fetchHistory = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setHistory(data);
  }, [token]);

  const loadChat = useCallback(
    async (chatId: string) => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setChat(data);
      setShowModal(false);
    },
    [token],
  );
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...chat.messages, userMessage];
    setChat({ ...chat, messages: updatedMessages });
    setInput("");
    setLoading(true);

    try {
      const cleanedMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const aiRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: cleanedMessages,
          }),
        },
      );

      const data = await aiRes.json();

      if (!aiRes.ok) {
        console.error("Groq API error:", data);
        return;
      }

      const aiMessage: Message = data.choices[0].message;
      const finalMessages = [...updatedMessages, aiMessage];

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/${chat._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: finalMessages,
          title: finalMessages[0]?.content.slice(0, 20) || "New Chat",
        }),
      });

      setChat({ ...chat, messages: finalMessages });
      fetchHistory();
    } catch (error) {
      console.error("AI fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmptyChats = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const chats: Chat[] = await res.json();

    const emptyChats = chats.filter((c) => c.messages.length === 0);

    for (const chat of emptyChats) {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/${chat._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    fetchHistory();
  }, [token, fetchHistory]);
  useEffect(() => {
    fetchUser();
    deleteEmptyChats().then(() => {
      createNewChat();
    });
  }, [fetchUser, deleteEmptyChats, createNewChat]);

  async function copClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#4797ed",
          color: "#fff",
        },
      });
    } catch (error) {
      if (error instanceof Error) toast.error("Something went wrong 🤷‍♂️!");
    }
  }

  return (
    <div className="font-nunito mt-20 grid place-items-center px-3 pb-10 md:mt-26 md:px-20 lg:mt-36">
      <div className="w-full max-w-3xl rounded-md bg-white shadow lg:max-w-[80%]">
        <div className="flex items-center justify-between border-b border-gray-200 bg-blue-100 px-4 py-6">
          <h1 className="text-gray-400">
            Hi,
            {user?.email
              ? user.email.length > 10
                ? " " + user.email.slice(0, 10) + "..."
                : user.email
              : ""}
          </h1>
          <div className="flex items-center gap-4">
            <i
              className={`fa-brands fa-rocketchat text-[25px] transition ${
                !chat || chat.messages.length === 0
                  ? "cursor-not-allowed text-gray-300 opacity-50"
                  : "cursor-pointer text-green-400 transition-all duration-300 hover:scale-110 active:scale-80"
              }`}
              onClick={() => {
                if (chat && chat.messages.length > 0) createNewChat();
              }}
            ></i>

            <i
              className="fa-solid fa-clock-rotate-left cursor-pointer text-[25px] text-gray-400 transition-all duration-300 active:scale-80"
              onClick={() => setShowModal(true)}
            ></i>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="h-[400px] overflow-auto px-4 pb-5 lg:h-[500px] bg-gray-100"
        >
          {chat?.messages.length === 0 && !loading && (
            <p className="mt-10 text-center text-sm text-gray-400 lg:text-[22px]">
              👋 Welcome! Start a conversation to see messages here.
            </p>
          )}
          {chat?.messages.map((msg, i) => (
            <div
              key={i}
              className={`relative mt-4 flex flex-col rounded-md p-3  ${
                msg.role === "user"
                  ? "bg-gray-100 text-right lg:ml-80"
                  : "bg-blue-50 text-left lg:mr-80"
              }`}
            >
              <div
                onClick={() => {
                  copClipboard(msg.content);
                }}
                className={`text-[20px] ${msg.role === "user" ? "right-3 text-gray-600" : "left-3 text-blue-500"} lg:cursor-pointer absolute top-2 transition-all duration-300 active:scale-80`}
              >
                <i className="fa-solid fa-copy"></i>
              </div>
              <p className="mt-8 text-sm text-gray-700">{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="mx-auto h-40 w-40">
              <DotLottieReact
                src="https://lottie.host/64fe27d9-8434-4b88-a710-c1973f0944c5/R2pLXdZ5XY.lottie"
                loop
                autoplay
              />
            </div>
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="flex items-center border-t border-gray-200 px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for something"
            disabled={loading}
            className="h-[38px] w-[85%] rounded-md border border-gray-300 indent-3 focus:outline-0 disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-[38px] w-[15%] rounded-md bg-gray-300 text-gray-700 transition-all duration-300 active:scale-90 disabled:pointer-events-none disabled:opacity-50 lg:cursor-pointer"
          >
            <i className="fa-solid fa-share"></i>
          </button>
        </form>
      </div>

      {showModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex w-full items-center justify-center bg-black/50">
          <div className="h-[50%] w-[90%] max-w-md overflow-auto rounded bg-white p-4 shadow">
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg font-semibold">Chat History</h2>
              <button onClick={() => setShowModal(false)}>✖</button>
            </div>
            <ul className="space-y-2 pb-5">
              {history.every((c) => c.title === "New Chat") && (
                <div className="mt-6 w-full text-center">
                  There is no history chats yet
                </div>
              )}
              {history.map((c) =>
                c.title !== "New Chat" ? (
                  <li
                    key={c._id}
                    className="cursor-pointer rounded p-2 hover:bg-gray-100"
                    onClick={() => loadChat(c._id)}
                  >
                    {c.title}
                  </li>
                ) : (
                  ""
                ),
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
