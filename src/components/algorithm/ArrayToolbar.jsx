import React from "react";
import { FaRandom } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const ArrayToolbar = ({ random, restart, step, showCode, setShowCode }) => {
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <button className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center">
          <FaRandom className="mr-2" />
          random array
        </button>

        <button className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center">
          <FaRedo className="mr-2" />
          restart
        </button>

        <button className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center">
          <FaPlay className="mr-2" />
          step over
        </button>

        <button className=" hover:text-white duration-300 text-rtools-blue-100  py-2 px-2 flex items-center">
          <FaCode className="mr-2" />
          showcode
        </button>
      </div>
    </div>
  );
};

export default ArrayToolbar;
