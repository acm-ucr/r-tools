const Header = ({ text }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-white text-4xl mb-0">{text}</p>
      <div className="bg-green-300 rounded h-1 w-20" />
    </div>
  );
};

export default Header;
