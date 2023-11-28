"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/bubbleSort";
import { example } from "@/util/sort/bubbleSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Bubble Sort"
      />
    </>
  );
};

export default page;
