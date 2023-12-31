import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
const HOVER = {
  up: "hover:-translate-y-1",
  highlight: "hover:bg-rtools-blue-200",
};
const Card = ({
  row,
  icon,
  description,
  name,
  color,
  link,
  hover,
  size,
  onClick,
}) => {
  return (
    <Link
      onClick={onClick}
      href={link}
      className={`${row ? "flex-row" : "flex-col"} ${HOVER[hover]} ${
        row ? "items-center" : "items-start"
      } justify-start no-underline flex bg-rtools-blue-300 transition-all duration-300 max-w-full rounded overflow-hidden px-3 py-2 gap-2`}
    >
      <Icon color={color} size="xl" icon={icon} />
      <div className="">
        <div
          className={`text-white 
          ${size === "xl" && "text-xl"} ${size === "base" && "text-base"}`}
        >
          {name}
        </div>
        <div
          className={`text-gray-400    ${size === "xl" && "text-base"} ${
            size === "base" && "text-xs"
          }`}
        >
          {description}
        </div>
      </div>
    </Link>
  );
};

export default Card;
