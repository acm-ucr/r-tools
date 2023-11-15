import React from "react";
import { FaPause, FaRandom } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";

const ArrayToolbar = ({
  random,
  restart,
  step,
  show,
  setShow,
  setPlay,
  play,
}) => {
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <div
          onClick={random}
          className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer"
        >
          <FaRandom className="mr-2" />
          random array
        </div>

        <div
          onClick={restart}
          className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer"
        >
          <FaRedo className="mr-2" />
          restart
        </div>

        <div
          onClick={() => setPlay(!play)}
          className={`hover:text-white duration-300 ${
            play ? "text-white" : "text-rtools-blue-100"
          }  py-2 px-2 flex items-center cursor-pointer`}
        >
          {play ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
          {play ? "pause" : "play"}
        </div>

        <div
          onClick={step}
          className="hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer"
        >
          <LuStepForward className="mr-2" />
          step over
        </div>

        <div
          onClick={() => setShow(!show)}
          className={`hover:text-white duration-300 ${
            show ? "text-white" : "text-rtools-blue-100"
          }  py-2 px-2 flex items-center cursor-pointer`}
        >
          <FaCode className="mr-2" />
          show
        </div>
      </div>
    </div>
  );
};

export default ArrayToolbar;
