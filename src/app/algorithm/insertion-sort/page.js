"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/insertionSort";
import { example } from "@/util/sort/insertionSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Insertion Sort"
      />
    </>
  );
};

export default page;
