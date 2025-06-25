import { useNavigate } from "react-router-dom";

interface NavbarModalProps {
  isModalOpened: boolean;
  onClose: () => void;
}
export default function NavbarModal({
  isModalOpened,
  onClose,
}: NavbarModalProps) {
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(`/${pathname}`);
    onClose();
  }
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen bg-[rgba(1,22,61,0.9)] flex items-center justify-center transition-all duration-300 ${
        isModalOpened
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className=" w-[85%] flex items-center justify-center flex-col gap-3 md:w-[60%] -mt-20 lg:mt-0">
        <div className="w-full text-end text-white text-[25px]">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </div>
        <div className="bg-white w-full h-full rounded-xl p-5">
          <ul className=" text-[16px] text-[#012970] flex gap-6 font-[600] items-start justify-center font-nunito flex-col">
            <li>How does it work</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Contact us</li>
            <li onClick={() => handleNavigate("login")}>Log In</li>
          </ul>
          <button
            className="mt-6 bg-[#4154f1] text-white text-[16px] font-nunito w-full py-2 rounded-md font-[700]"
            onClick={() => handleNavigate("register")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
