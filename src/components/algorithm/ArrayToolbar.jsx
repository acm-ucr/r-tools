import React from "react";
import { FaPause, FaRandom } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { LuStepForward, LuStepBack } from "react-icons/lu";

const ArrayToolbar = ({
  random,
  restart,
  step,
  back,
  show,
  setShow,
  onPlay,
  play,
}) => {
  return (
    <div className="flex space-x-4">
      <div
        onClick={random}
        className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer select-none"
      >
        <FaRandom className="mr-2" />
        random array
      </div>

      <div
        onClick={restart}
        className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer select-none"
      >
        <FaRedo className="mr-2" />
        restart
      </div>

      <div
        onClick={onPlay}
        className={`hover:text-white duration-300 ${
          play ? "text-white" : "text-rtools-blue-100"
        }  py-2 px-2 flex items-center cursor-pointer select-none`}
      >
        {play ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
        {play ? "pause" : "play"}
      </div>

      <div
        onClick={back}
        className="hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer select-none"
      >
        <LuStepBack className="mr-2" />
        step back
      </div>

      <div
        onClick={step}
        className="hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer select-none"
      >
        <LuStepForward className="mr-2" />
        step over
      </div>

      <div
        onClick={() => setShow(!show)}
        className={`hover:text-white duration-300 ${
          show ? "text-white" : "text-rtools-blue-100"
        }  py-2 px-2 flex items-center cursor-pointer select-none`}
      >
        <FaCode className="mr-2" />
        show
      </div>
    </div>
  );
};

export default ArrayToolbar;
