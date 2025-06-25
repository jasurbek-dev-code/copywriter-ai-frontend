import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarProfileModal from "./navbar-profile-modal";
import type { User } from "../pages/user/user-profile";
import toast from "react-hot-toast";

export default function NavbarProfile() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpened, setisModalOpened] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error("User fetch failed");
      }
    }

    fetchUser();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isModalOpened) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpened]);
  function handleNavigate(pathname: string) {
    navigate(`/${pathname}`);
  }
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Succesfully logged out 😊!");
  }
  return (
    <div
      className={`fixed top-0 left-0 z-[20] flex w-full items-center justify-between bg-white px-3 transition-all ${
        scrolled ? "h-[60px] shadow-md" : "h-[70px]"
      }`}
    >
      <h1
        className="font-nunito text-[25px] font-bold text-[#012970] lg:cursor-pointer"
        onClick={() => {
          handleNavigate("");
          console.log("first");
        }}
      >
        Copywriter Ai
      </h1>

      <div className="flex items-center justify-end gap-5 lg:gap-10">
        <div className="font-nunito flex size-[45px] items-center justify-center rounded-full bg-blue-600 text-[25px] leading-0 font-[700] text-white">
          {user?.email[0].toUpperCase()}
        </div>

        <div className="font-nunito hidden items-center justify-center gap-8 text-[18px] lg:flex">
          <h1>Pricing</h1>
          <h1>Contact us</h1>
          <h1
            onClick={() => {
              navigate("/user-profile");
            }}
          >
            Profile
          </h1>
          <button
            onClick={handleLogout}
            className="font-nunito mt-6 w-full rounded-md bg-red-500 py-2 text-[16px] lg:mt-0 font-[700] text-white lg:w-auto lg:cursor-pointer lg:px-4"
          >
            Log Out
          </button>
        </div>
        <div
          className="text-[22px] text-[#012970] lg:hidden"
          onClick={() => setisModalOpened(!isModalOpened)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <NavbarProfileModal
        isModalOpened={isModalOpened}
        onClose={() => setisModalOpened(!isModalOpened)}
      />
    </div>
  );
}
