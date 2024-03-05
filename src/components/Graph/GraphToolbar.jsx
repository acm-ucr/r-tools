import React from "react";
import { FaPlay } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import { MdOutlineReplay } from "react-icons/md";
import ActionButton from "../ActionButton";

const GraphToolbar = ({ step, replay, play }) => {
  return (
    <div className="flex space-x-4">
      <ActionButton function={play} text="play" icon={FaPlay} />
      <ActionButton function={step} text="step" icon={LuStepForward} />
      <ActionButton function={replay} text="replay" icon={MdOutlineReplay} />
    </div>
  );
};

export default GraphToolbar;
