const Header = ({ text }) => {
  return (
    <div>
      <p className="text-white text-4xl mb-0 tag">{text}</p>
      <div className="bg-green-300 rounded h-1 w-20"></div>
    </div>
  );
};

export default Header;
