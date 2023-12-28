"use client";
import Input from "../Input";
import { useEffect, useState } from "react";
import ArrayToolbar from "./ArrayToolbar";
import BarChart from "../charts/BarChart";
import toast from "react-hot-toast";
import CodeView from "../CodeView";
import Header from "../Header";
import BinaryTree from "./BinaryTree";
import Table from "../Table";

const AlgorithmWrapper = ({ title, sort, code, example, type = "sort" }) => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(true);
  const [play, setPlay] = useState(false);

  const handleGenerate = () => {
    if (!input) {
      toast.error(
        "Please enter a valid array (list of integers separated by commas)"
      );
      return;
    }
    const validationRegex = /^\d+(,\s*\d+)*$/;
    if (!validationRegex.test(input)) {
      toast.error(
        "Please enter a valid array (list of integers separated by commas)"
      );
      return;
    }
    const arr = input.split(",").map((num) => parseInt(num));
    const sortFunction = sort(arr);
    setStepIndex(0);
    setSteps(sortFunction);
    setCurrent(sortFunction.next().value);
  };

  const handleStep = () => {
    if (!steps) return;
    const next = steps.next();
    if (next.done) {
      toast.success("Array Sorted!");
      setPlay(false);
      return;
    } else {
      setStepIndex(stepIndex + 1);
      setCurrent(next.value);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      const arr = input.split(",").map((num) => parseInt(num));
      const sortFunction = sort(arr);
      let currNext = null;
      for (let i = 0; i < stepIndex; i++) currNext = sortFunction.next().value;
      setSteps(sortFunction);
      setCurrent(currNext);
      setStepIndex(stepIndex - 1);
    }
  };

  const handleRandom = () => {
    const size = Math.floor(Math.random() * 10) + 5;
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    setInput(arr.join(", "));
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
      <div className="flex flex-col items-center justify-center w-screen min-h-[80vh]">
        <Header
          text={title}
          description='Enter a comma-separated list of integers, click "Generate" to visualize, and use "Play" and "Pause" to observe the step-by-step sorting process. Explore different inputs with "Reset"'
        />
        <div className="pt-6 w-3/5">
          <Input
            thick={true}
            value={input}
            setValue={setInput}
            button="Generate"
            onSubmit={handleGenerate}
            clear={true}
            placeholder="integers separated by commas (ex. 10, 25, 200, 3, 56, 34, 21, 63)"
          />
        </div>
        <ArrayToolbar
          setPlay={setPlay}
          play={play}
          restart={handleGenerate}
          back={handleBack}
          step={handleStep}
          show={show}
          setShow={setShow}
          random={handleRandom}
        />
        {current && (
          <div
            className={`grid gap-3 items-center ${
              show ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {type === "sort" && (
              <BarChart width={600} height={450} data={current.array} />
            )}
            {type === "heap" && <BinaryTree arr={current.array} />}
            {type === "tables" && (
              <div className="flex flex-col items-start gap-2">
                {current.tables.map((table, key) => (
                  <Table key={key} matrix={table} />
                ))}
              </div>
            )}
            {show && (
              <CodeView codes={code} code={code} currLine={current.line} />
            )}
          </div>
        )}
      </div>
      <div className="snap-start h-[90vh] flex items-center justify-center w-7/12">
        <CodeView editor={true} codes={example} />
      </div>
    </>
  );
};

export default AlgorithmWrapper;
