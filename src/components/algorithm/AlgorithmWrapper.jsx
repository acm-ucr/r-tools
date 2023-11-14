"use client";
import Input from "../Input";
import { useEffect, useState } from "react";
import ArrayToolbar from "./ArrayToolbar";
import BarChart from "../charts/BarChart";
import toast from "react-hot-toast";
import CodeView from "../CodeView";
import Header from "../Header";
import BinaryTree from "./BinaryTree";

const AlgorithmWrapper = ({ title, sort, code, example, type = "sort" }) => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState(null);
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(false);

  const handleGenerate = () => {
    // TODO: array validation, if the input is not valid (has non-numeric value, or empty), show error in the toast
    const arr = input.split(",").map((num) => parseInt(num));
    const sortFunction = sort(arr);
    setSteps(sortFunction);
    setCurrent(sortFunction.next().value);
  };

  const handleStep = () => {
    const next = steps.next();
    if (next.done) {
      toast.success("Array Sorted!");
      setPlay(false);
      return;
    } else {
      setCurrent(next.value);
    }
  };

  const handleRandom = () => {
    // TODO: generate a random array string and put it in input
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (play) handleStep();
    }, 300);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <>
      <div className="w-screen flex flex-col items-center h-screen justify-center">
        <Header text={title} />
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
          restart={handleGenerate}
          step={handleStep}
          show={show}
          setShow={setShow}
          random={handleRandom}
        />
        {current && (
          <div className={`grid ${show ? "grid-cols-2" : "grid-cols-1"}`}>
            {type === "sort" && (
              <BarChart width={600} height={450} data={current.array} />
            )}
            {type === "heap" && <BinaryTree arr={current.array} />}
            {show && (
              <CodeView codes={code} code={code} currLine={current.line} />
            )}
          </div>
        )}
      </div>
      <div className="snap-start w-screen h-[90vh] flex items-center justify-center">
        <div className="w-7/12 ">
          <CodeView editor={true} codes={example} />
        </div>
      </div>
    </>
  );
};

export default AlgorithmWrapper;
