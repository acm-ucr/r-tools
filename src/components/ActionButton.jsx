const ActionButton = ({
  icon: Icon,
  text,
  function: onClick,
  active = false,
  activeIcon: ActiveIcon,
  activeText,
  twoIcons = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`hover:text-white duration-300 ${
        active ? "text-white" : "text-rtools-blue-100"
      } py-2 px-2 flex items-center cursor-pointer select-none`}
    >
      {twoIcons ? (
        active ? (
          <ActiveIcon className="mr-2" />
        ) : (
          <Icon className="mr-2" />
        )
      ) : (
        <Icon className="mr-2" />
      )}
      {twoIcons ? (active ? activeText : text) : text}
    </div>
  );
};

export default ActionButton;
