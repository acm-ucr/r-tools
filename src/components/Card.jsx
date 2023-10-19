import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import { BsFillBarChartFill } from "react-icons/bs";

const Card = ({ icon, description, name, color, link }) => {
  return (
    <Link href={link}>
      <div className="hover:-translate-y-1 transition-all duration-300 max-w-xs rounded overflow-hidden shadow-lg">
        <div className="px-3 pt-3 pb-2">
          <Icon color="teal" size="xl" icon={<BsFillBarChartFill />} />
        </div>
        <div className="px-3">
          <div className="font-bold text-xl">Selection Sort</div>
          <p className="text-gray-400 text-base">Visualize selection sort</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
