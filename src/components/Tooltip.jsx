"use client";

import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const Tooltip = ({ description }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <FaRegQuestionCircle
        className={`text-xl ${show ? "text-white" : "text-rtools-blue-100"}`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <div className="absolute border border-black rounded-xl bg-white text-black p-2 w-80 whitespace-pre-line shadow-md">
          {description}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
