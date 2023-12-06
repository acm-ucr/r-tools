"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/mergeSort";
import { example } from "@/util/sort/mergeSort";
const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Merge Sort"
      />
    </>
  );
};

export default page;
