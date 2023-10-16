import Image from "next/image";
import Logo from "../Assets/RToolsLogo.svg";

const Footer = () => {
  return (
    <div className="h-28 mx-8 text-white flex justify-between items-end gap-24 border-2 border-red-500">
      <div className="h-full flex items-center shrink-0 border-2 border-red-500">
        <Image src={Logo} />
      </div>
      <div className="text-sm border-2 border-red-500 whitespace-nowrap">
        © Copyright acm@ucr All rights reserved
      </div>
      <div className="text-base border-2 border-red-500">
        contact.acmucr@gmail.com
      </div>
    </div>
  );
};

export default Footer;
