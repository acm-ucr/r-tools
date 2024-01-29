import React from "react";
import { FaPause, FaRandom } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { LuStepForward, LuStepBack } from "react-icons/lu";
import ActionButton from "../ActionButton";

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
      <ActionButton function={random} text="random array" icon={FaRandom} />

      <ActionButton function={restart} text="restart" icon={FaRedo} />

      <ActionButton
        function={onPlay}
        text="play"
        activeText="pause"
        icon={FaPlay}
        activeIcon={FaPause}
        active={play}
        twoIcons={true}
      />

      <ActionButton function={back} text="step back" icon={LuStepBack} />

      <ActionButton function={step} text="step over" icon={LuStepForward} />

      <ActionButton
        function={() => setShow(!show)}
        text="show"
        icon={FaCode}
        active={show}
      />
    </div>
  );
};

export default ArrayToolbar;
