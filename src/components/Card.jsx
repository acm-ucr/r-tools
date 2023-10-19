import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

const Card = ({ row, icon, description, name, color, link }) => {
  return (
    <Link
      href={link}
      className={`${
        row ? "flex-row" : "flex-col"
      } no-underline flex bg-rtools-blue-300 hover:-translate-y-1 transition-all duration-300 max-w-full rounded overflow-hidden`}
    >
      <div className="px-3 pt-3 pb-2">
        <Icon color={color} size="xl" icon={icon} />
      </div>
      <div className="px-3">
        <div className="text-white font-bold text-xl">{name}</div>
        <p className="text-gray-400 text-base">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
