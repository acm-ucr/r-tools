"use client";
import Input from "../Input";
import { useEffect, useState } from "react";
import ArrayToolbar from "./ArrayToolbar";
import BarChart from "../charts/BarChart";
import CodePlay from "../CodePlay";
import toast from "react-hot-toast";

const SortWraper = ({ title, sort, code }) => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState(null);
  const [currStep, setCurrStep] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [play, setPlay] = useState(false);

  const handleGenerate = () => {
    // TODO: array validation, if the input is not valid (has non-numeric value, or empty), show error in the toast
    const arr = input.split(",").map((num) => parseInt(num));
    setSteps(sort(arr));
  };

  const handleStep = () => {
    if (currStep + 1 >= steps.length) toast("Array Sorted");
    else setCurrStep(currStep + 1);
  };

  const handleRestart = () => setCurrStep(0);

  const handlePlay = () => {
    setPlay(!play);
  };

  const handleRandom = () => {
    // TODO: generate a random array string and put it in input
  };

  useEffect(() => {
    const id = setInterval(
      () =>
        setCurrStep(
          currStep + 1 < steps?.length && play ? currStep + 1 : currStep
        ),
      300
    );

    return () => {
      clearInterval(id);
    };
  });

  return (
    <>
      <Input
        thick={true}
        value={input}
        setValue={setInput}
        button="Generate"
        onClick={handleGenerate}
        clear={true}
      />
      <ArrayToolbar
        playClick={handlePlay}
        play={play}
        restart={handleRestart}
        step={handleStep}
        showCode={showCode}
        setShowCode={setShowCode}
        random={handleRandom}
      />
      {steps && (
        <div className={`grid ${showCode ? "grid-cols-2" : "grid-cols-1"}`}>
          <BarChart width={600} height={300} data={steps[currStep].array} />
          {showCode && (
            <CodePlay
              codes={code}
              code={code}
              currLine={steps[currStep].line}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SortWraper;
