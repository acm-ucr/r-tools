import Image from "next/image";
import Logo from "../../Assets/RToolsLogo.svg";
const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={Logo} height={250} width={250} />
      <p className="text-center py-3 max-w-4xl text-blue-100">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut qu consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut qu
      </p>
    </div>
  );
};

export default Landing;
