"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/selectionSort";
import { example } from "@/util/sort/selectionSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Selection Sort"
      />
    </>
  );
};

export default page;
