"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort, example } from "@/util/sort/heap";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        type="heap"
        code={code}
        sort={sort}
        example={example}
        title="Heap"
      />
    </>
  );
};

export default page;
