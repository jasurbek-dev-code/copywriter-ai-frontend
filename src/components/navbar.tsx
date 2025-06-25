import { useEffect, useState } from "react";
import NavbarModal from "./navbar-modal";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpened, setisModalOpened] = useState(false);
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
  return (
    <div
      className={`fixed top-0 left-0 z-[20] flex w-full items-center justify-between bg-white px-3 transition-all lg:px-8 ${
        scrolled ? "h-[60px] shadow-md lg:h-[80px]" : "h-[70px] lg:h-[90px]"
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
      <div
        className="text-[22px] text-[#012970] lg:hidden"
        onClick={() => setisModalOpened(!isModalOpened)}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="hidden lg:flex items-center gap-8 text-[18px] font-nunito">
        <h1 className="cursor-pointer">How does it work</h1>
        <h1 className="cursor-pointer">Features</h1>
        <h1 className="cursor-pointer">Pricing</h1>
        <h1 className="cursor-pointer">Contact us</h1>
      </div>
      <NavbarModal
        isModalOpened={isModalOpened}
        onClose={() => setisModalOpened(!isModalOpened)}
      />
    </div>
  );
}
