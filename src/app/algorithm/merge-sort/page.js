"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort, example } from "@/util/sort/mergeSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Merge Sort"
        type="tables"
      />
    </>
  );
};

export default page;
