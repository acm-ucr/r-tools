import Tooltip from "./Tooltip";

const Header = ({ text, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center gap-3">
        <p className="text-white text-4xl mb-0">{text}</p>
        {description && <Tooltip description={description} />}
      </div>
      <div className="bg-green-300 rounded h-1 w-20 my-2" />
    </div>
  );
};

export default Header;
