"use client";

import { useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";

const Tooltip = ({ description }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <CiCircleQuestion
        className={`text-3xl ${show ? "text-white" : "text-rtools-blue-100"}`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <div className="absolute border border-black rounded-xl bg-white text-black p-2 w-80 whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
