export default function Footer() {
  return (
    <div className="mt-[20px] border-t border-gray-200 lg:mt-30">
      <div className="flex w-full flex-col px-3 py-5 md:px-8 shadow-xl ">
        <div className="md:flex md:items-center md:justify-center md:flex-col">
          <h1 className="font-nunito text-[22px] font-bold text-[#012970]">
            Copywriter Ai
          </h1>
          <p className="font-nunito mt-2 text-[14px] leading-[24px]">
            AI-based copywriting service that automatically generates human-like
            and unique content in seconds.
          </p>
          <div className="mt-2 flex items-center gap-4 text-[22px] text-[rgba(1,41,112,.5)]">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </div>
        <div className="mt-7 flex items-start justify-between gap-10 md:justify-around">
          <div className="md:flex md:items-center md:flex-col">
            <h1 className="font-nunito text-[20px] font-[600] text-[#012970] ">
              Useful Links
            </h1>
            <ul className="font-nunito mt-1 leading-[30px] text-[#012970] md:flex md:flex-col md:items-center">
              <li>How does it work</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Terms of use</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="md:flex md:items-center md:flex-col">
            <h1 className="font-nunito text-[20px] font-[600] text-[#012970]">
              Services
            </h1>
            <ul className="font-nunito mt-1 leading-[30px] text-[#012970] md:flex md:flex-col md:items-center">
              <li>AlphaWriter chapbot</li>
              <li>Essay writing</li>
              <li>Blog posts for SEO</li>
              <li>Blog content generation</li>
              <li>College paper writing</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          <h1 className="font-nunito text-[20px] font-[600] text-[#012970]">
            Contact Us
          </h1>
          <p className="font-nunito mt-2 text-[16px] font-[700] text-[#444]">
            Email:{" "}
            <span className="text-[14px] font-normal">
              yoqubjonovjasurbek612@gmail.com
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-4 flex items-center justify-center">
        <p className="text-[#012970] text-[14px] font-nunito">© Copyright <span className="font-[700]">Copywright Ai</span>. All rights reserved</p>
      </div>
    </div>
  );
}
