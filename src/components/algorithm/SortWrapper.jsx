"use client";
import Input from "../Input";
import { useEffect, useState } from "react";
import ArrayToolbar from "./ArrayToolbar";
import BarChart from "../charts/BarChart";
import toast from "react-hot-toast";
import CodeView from "../CodeView";

const SortWrapper = ({ title, sort, code }) => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState(null);
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(false);

  const handleGenerate = () => {
    // TODO: array validation, if the input is not valid (has non-numeric value, or empty), show error in the toast
    const arr = input.split(",").map((num) => parseInt(num));
    setSteps(sort(arr));
  };

  const handleStep = () => {
    if (current + 1 >= steps.length) toast("Array Sorted");
    else setCurrent(current + 1);
  };

  const handleRestart = () => setCurrent(0);

  const handleRandom = () => {
    // TODO: generate a random array string and put it in input
  };

  useEffect(() => {
    if (current === steps?.length - 1) setPlay(false);
    const id = setInterval(
      () =>
        setCurrent(current + 1 < steps?.length && play ? current + 1 : current),
      300
    );

    return () => {
      clearInterval(id);
    };
  });

  return (
    <>
      <div className="w-screen flex flex-col items-center h-screen justify-center">
        <Input
          thick={true}
          value={input}
          setValue={setInput}
          button="Generate"
          onClick={handleGenerate}
          clear={true}
        />
        <ArrayToolbar
          setPlay={setPlay}
          play={play}
          restart={handleRestart}
          step={handleStep}
          show={show}
          setShow={setShow}
          random={handleRandom}
        />
        {steps && (
          <div className={`grid ${show ? "grid-cols-2" : "grid-cols-1"}`}>
            <BarChart width={600} height={450} data={steps[current].array} />
            {show && (
              <CodeView
                codes={code}
                code={code}
                currLine={steps[current].line}
              />
            )}
          </div>
        )}
      </div>
      <div className="snap-start w-screen h-[90vh] flex items-center justify-center">
        <div className="w-7/12 ">
          <CodeView editor={true} codes={{ python: "hihihihihihi" }} />
        </div>
      </div>
    </>
  );
};

export default SortWrapper;
