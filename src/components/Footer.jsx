import Image from "next/image";
import Logo from "../Assets/RToolsLogo.svg";

const Footer = () => {
  return (
    <div className="h-28 mx-8 mb-2 text-white flex justify-between items-end">
      <div className="h-full flex items-center shrink-0">
        <Image src={Logo} />
      </div>
      <div className="text-sm">© Copyright acm@ucr All rights reserved</div>
      <div className="text-base">contact.acmucr@gmail.com</div>
    </div>
  );
};

export default Footer;
