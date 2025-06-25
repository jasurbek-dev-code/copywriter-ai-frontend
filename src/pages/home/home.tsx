import rafiki from "../../assets/people using robots-rafiki.svg";
import chatWelcome from "../../assets/chat-welcome.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
  const navigate = useNavigate();
  function handleNaviagte(pahthname: string) {
    navigate(`/${pahthname}`);
  }
  const location = useLocation();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    setisLoggedIn(!!localStorage.getItem("token"));
  }, [location]);
  return (
    <div className="mt-[70px]">
      <div className="flex flex-col bg-white py-6 md:py-8 lg:flex-row">
        <div className="flex w-full flex-col items-center justify-center px-7 lg:w-[50%]">
          <h1 className="font-nunito text-center text-[30px] leading-[33px] font-[700] text-[#012970]">
            AI-Powered Copywriter that writes for you
          </h1>
          <p className="font-nunito mt-5 text-center text-[20px] text-[#444]">
            Create human-quality blog posts, SEO articles, news, press releases,
            and more in seconds
          </p>
          {isLoggedIn ? (
            <button
              onClick={() => handleNaviagte("user-profile")}
              className="font-nunito mt-7 rounded-md bg-blue-700 px-6 py-2 text-white md:px-10 md:py-2 md:text-[20px] lg:cursor-pointer"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => handleNaviagte("register")}
              className="font-nunito mt-7 rounded-md bg-blue-700 px-6 py-2 text-white md:px-10 md:py-2 md:text-[20px] lg:cursor-pointer"
            >
              Get Started
            </button>
          )}
        </div>
        <div className="mt-5 flex w-full items-center justify-center px-3 lg:w-[50%]">
          <img src={rafiki} alt="" />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center justify-center bg-white py-6">
        <div className="flex flex-col items-center justify-center px-6">
          <p className="font-nunito text-blue-400">How does it work</p>
          <h1 className="font-nunito mt-5 text-center text-[25px] font-[800] text-[#012970]">
            The best ChatGPT alternative for long-form content
          </h1>
        </div>
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-10 px-4 md:gap-15 md:px-30 lg:flex-row">
          <div className="font-nunito flex w-full flex-col items-center justify-center bg-white p-8 shadow">
            <h1 className="text-[22px] font-[700] text-[#012970]">Describe</h1>
            <p className="mt-3 text-center text-[18px] text-[#444]">
              Start a chat with Qopywriter by asking a question or giving an
              instruction.
            </p>
          </div>
          <div className="font-nunito flex w-full flex-col items-center justify-center bg-white p-8 shadow">
            <h1 className="text-[22px] font-[700] text-[#012970]">Generate</h1>
            <p className="mt-3 text-center text-[18px] text-[#444]">
              Qopywriter's AI adapts to your needs, offering content solutions
              from articles to essays.
            </p>
          </div>
          <div className="font-nunito flex w-full flex-col items-center justify-center bg-white p-8 shadow">
            <h1 className="text-[22px] font-[700] text-[#012970]">
              Edit and Export
            </h1>
            <p className="mt-3 text-center text-[18px] text-[#444]">
              Transfer Qopywriter's chat content into a document. Export in
              different formats.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-col items-center justify-center bg-white py-6">
        <div className="flex flex-col items-center justify-center px-6">
          <p className="font-nunito text-blue-400">Features</p>
          <h1 className="font-nunito mt-5 text-center text-[25px] font-[800] text-[#012970]">
            What can you create with Copywrite Ai?
          </h1>
        </div>
        <div className="lg:mt-10 lg:flex lg:flex-row lg:items-center">
          <div className="mt-8 w-full px-6 md:px-20">
            <img src={chatWelcome} alt="" />
          </div>
          <div className="mt-6 flex w-full flex-col gap-4 bg-gray-50 px-3 py-4 md:px-20">
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-5 shadow">
              <div className="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-[#012970]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h1 className="font-nunito text-[18px] font-[700] text-[#012970]">
                Blog Posts
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-5 shadow">
              <div className="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-[#012970]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h1 className="font-nunito text-[18px] font-[700] text-[#012970]">
                College Essays
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-5 shadow">
              <div className="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-[#012970]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h1 className="font-nunito text-[18px] font-[700] text-[#012970]">
                SEO Articles
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-5 shadow">
              <div className="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-[#012970]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h1 className="font-nunito text-[18px] font-[700] text-[#012970]">
                Press Articles
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-5 shadow">
              <div className="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-[#012970]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h1 className="font-nunito text-[18px] font-[700] text-[#012970]">
                New Articles
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-5 shadow">
              <div className="flex size-[30px] items-center justify-center rounded-md bg-blue-100 text-[#012970]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h1 className="font-nunito text-[18px] font-[700] text-[#012970]">
                Production Descriptions
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-col items-center justify-center bg-white py-6">
        <div className="flex flex-col items-center justify-center px-6">
          <p className="font-nunito text-blue-400">Pricing</p>
          <h1 className="font-nunito mt-5 text-center text-[25px] font-[800] text-[#012970]">
            Try for free, no credit card required
          </h1>
        </div>
        <div className="font-nunito mt-6 flex w-full flex-col gap-5 px-4 md:gap-10 md:px-50 lg:mt-10 lg:flex-row">
          <div className="flex w-full flex-col items-center justify-start rounded-md bg-white py-5 shadow-md">
            <span className="mt-4 text-[24px] font-[700] text-[#07d5c0]">
              Lite
            </span>
            <div className="flex items-end gap-1">
              <p className="mt-1 text-[35px] font-[800] text-[#444]">$9</p>
              <span className="text-[28px] text-[#a7a3a3]">/</span>
              <span className="mb-1 text-[18px] text-[#a8a7a7]">month</span>
            </div>
            <ul className="mt-4 text-center leading-[30px] text-[#444]">
              <li>500 chat messages / month</li>
              <li>All types of content</li>
              <li>Online article editor</li>
              <li>Advanced export</li>
            </ul>
           <button className="mt-5 rounded-full border border-blue-500 px-6 py-2 font-[700] text-blue-500 transition-all duration-300 lg:cursor-pointer lg:hover:bg-blue-500 lg:hover:text-white">
              Buy now
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-start rounded-md bg-white py-5 shadow-md">
            <span className="mt-4 text-[24px] font-[700] text-[#65c600]">
              Pro
            </span>
            <div className="flex items-end gap-1">
              <p className="mt-1 text-[35px] font-[800] text-[#444]">$19</p>
              <span className="text-[28px] text-[#a7a3a3]">/</span>
              <span className="mb-1 text-[18px] text-[#a8a7a7]">month</span>
            </div>
            <ul className="mt-4 text-center leading-[30px] text-[#444]">
              <li>Unlimited messages / month</li>
              <li>All types of content</li>
              <li>Online article editor</li>
              <li>Advanced export</li>
            </ul>
            <button className="mt-5 rounded-full border border-blue-500 px-6 py-2 font-[700] text-blue-500 transition-all duration-300 lg:cursor-pointer lg:hover:bg-blue-500 lg:hover:text-white">
              Buy now
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-start rounded-md bg-white py-5 shadow-md">
            <span className="mt-4 text-[24px] font-[700] text-[#ff0071]">
              Yearly
            </span>
            <div className="flex items-end gap-1">
              <p className="mt-1 text-[35px] font-[800] text-[#444]">$169</p>
              <span className="text-[28px] text-[#a7a3a3]">/</span>
              <span className="mb-1 text-[18px] text-[#a8a7a7]">month</span>
            </div>
            <ul className="mt-4 text-center leading-[30px] text-[#444]">
              <li>Unlimited messages / month</li>
              <li>All types of content</li>
              <li>Online article editor</li>
              <li>Advanced export</li>
            </ul>
         <button className="mt-5 rounded-full border border-blue-500 px-6 py-2 font-[700] text-blue-500 transition-all duration-300 lg:cursor-pointer lg:hover:bg-blue-500 lg:hover:text-white">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
