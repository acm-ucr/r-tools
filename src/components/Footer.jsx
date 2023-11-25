import Image from "next/image";
import Logo from "../Assets/RToolsLogo.svg";

const Footer = () => {
  return (
    <div className="h-28 mx-8 mb-4 text-white flex justify-between items-end gap-x-8 gap-y-2 flex-wrap">
      <div className="h-full flex items-center shrink-0">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="text-sm whitespace-nowrap">
        © Copyright acm@ucr All rights reserved
      </div>
      <div className="text-base">contact.acmucr@gmail.com</div>
    </div>
  );
};

export default Footer;
