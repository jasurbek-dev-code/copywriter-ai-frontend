import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/auth-button";
import toast from "react-hot-toast";

export default function Register() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoaded, setisLoaded] = useState(true);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    setisLoaded(false);
    e.preventDefault();

    if (password.length < 8) {
      setisLoaded(true)
      return toast.error("Password must be at least 8 characters !");
    }

    if (password !== repeatPassword) {
      setisLoaded(true)
      return toast.error("Passwords do not match !");
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        {
          toast.error(data.message || "Something went wrong");
          setisLoaded(true);
        }
      } else {
        navigate("/login");
        toast.success("User registered successfully 😊!");
        setisLoaded(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setisLoaded(true);
      }
    }
  }

  return (
    <div className="grid min-h-screen w-full place-items-center bg-gray-100 py-30">
      <div className="w-[90%] rounded-md bg-white px-5 py-10 shadow-md md:w-[60%] lg:w-[40%]">
        <div className="flex w-full items-center justify-center">
          <h1 className="font-nunito text-[25px] font-[700] text-[#012970]">
            Sign Up
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex w-full flex-col items-center justify-center gap-5"
        >
          <div className="flex w-full gap-3 border-b pb-1">
            <div className="text-[18px] text-gray-500">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-0"
              required
            />
          </div>

          <div className="flex w-full items-center gap-3 border-b pb-1">
            <div className="text-[18px] text-gray-500">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              type={show1 ? "text" : "password"}
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-0"
              required
            />
            <i
              className={`fa-solid ${show1 ? "fa-eye-slash" : "fa-eye"} cursor-pointer text-gray-500`}
              onClick={() => setShow1(!show1)}
            ></i>
          </div>

          <div className="flex w-full items-center gap-3 border-b pb-1">
            <div className="text-[18px] text-gray-500">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              type={show2 ? "text" : "password"}
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full focus:outline-0"
              required
            />
            <i
              className={`fa-solid ${show2 ? "fa-eye-slash" : "fa-eye"} cursor-pointer text-gray-500`}
              onClick={() => setShow2(!show2)}
            ></i>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-5">
            <AuthButton text="Register" isLoaded={isLoaded} />

            <p
              className="font-nunito cursor-pointer text-[14px] text-blue-600 underline"
              onClick={() => navigate("/login")}
            >
              Login instead
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
