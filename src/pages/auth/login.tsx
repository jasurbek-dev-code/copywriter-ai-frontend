import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/auth-button";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isLoaded, setisLoaded] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    setisLoaded(false);
    e.preventDefault();
    if (password.length < 8) {
      setisLoaded(true);
      return toast.error("Password must be at least 8 characters !");
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setisLoaded(true);
        toast.error(data.message || "Invalid credentials !");
      } else {
        navigate("/user-profile");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("User logged in successfully 😊!");
        setisLoaded(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setisLoaded(true);
        toast.error("Serverda Xatolik !");
      }
    }
  }
  function handleNavigate(pathname: string) {
    navigate(`/${pathname}`);
  }
  return (
    <div className="grid min-h-screen w-full place-items-center bg-gray-100 py-30">
      <div className="w-[90%] rounded-md bg-white px-5 py-10 shadow-md md:w-[60%] lg:w-[40%]">
        <div className="flex w-full items-center justify-center">
          <h1 className="font-nunito text-[25px] font-[700] text-[#012970]">
            Login
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
              value={email}
              type="text"
              placeholder="Email"
              className="w-full focus:outline-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center gap-3 border-b pb-1">
            <div className="text-[18px] text-gray-500">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              type={show ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-0"
              required
            />
            <i
              className={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"} cursor-pointer text-gray-500`}
              onClick={() => setShow(!show)}
            ></i>
          </div>
          <div className="mt-7 flex flex-col items-center justify-center gap-5">
            <AuthButton text="Login" isLoaded={isLoaded} />
            <p
              className="font-nunito cursor-pointer text-[14px] text-blue-600 underline"
              onClick={() => handleNavigate("register")}
            >
              Register instead
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
