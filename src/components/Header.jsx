const Header = ({ text }) => {
  return (
    <div>
      <h1 className="text-white text-4xl mb-0">{text}</h1>
      <div className="bg-green-300 rounded h-1 w-20"></div>
    </div>
  );
};

export default Header;
