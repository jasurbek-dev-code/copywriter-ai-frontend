interface AuthButtonProps {
  text: string;
  isLoaded: boolean;
}
export default function AuthButton({ text, isLoaded }: AuthButtonProps) {
  return (
    <button
      disabled={!isLoaded}
      className="font-nunito rounded-md bg-blue-600 px-6 py-2 text-[18px] font-[700] text-white disabled:cursor-not-allowed disabled:bg-gray-600 disabled:animate-pulse lg:cursor-pointer"
    >
      {text}
    </button>
  );
}
