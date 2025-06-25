import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface NavbarModalProps {
  isModalOpened: boolean;
  onClose: () => void;
}
export default function NavbarProfileModal({
  isModalOpened,
  onClose,
}: NavbarModalProps) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    onClose();
    navigate("/");
    toast.success("Succesfully logged out 😊!")
  }
  return (
    <div
      className={`absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-[rgba(1,22,61,0.9)] transition-all duration-300 ${
        isModalOpened
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex w-[85%] flex-col items-center justify-center -mt-20 lg:mt-0 gap-3 md:w-[60%]">
        <div className="w-full text-end text-[25px] text-white">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </div>
        <div className="h-full w-full rounded-xl bg-white p-5">
          <ul className="font-nunito flex flex-col items-start justify-center gap-6 text-[16px] font-[600] text-[#012970]">
            <li>Pricing</li>
            <li>Contact us</li>
            <li
              onClick={() => {
                navigate("/user-profile");
                onClose();
              }}
            >
              Profile
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="font-nunito mt-6 w-full rounded-md bg-red-500 py-2 text-[16px] font-[700] text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
