import Image from "next/image";
import Logo from "../../Assets/RToolsLogo.svg";
const Landing = () => {
  return (
    <div className="flex flex-col items-center mt-5 mb-2">
      <Image src={Logo} height={250} width={250} />
      <p className="text-center py-3 text-blue-100 text-sm w-2/5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut qu consectetur adipiscing elit, sed do eius
      </p>
    </div>
  );
};

export default Landing;
