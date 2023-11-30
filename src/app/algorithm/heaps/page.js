"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/heap"; // change this to heap : import { code, sort } from "@/util/sort/heap";
import { example } from "@/util/sort/heap"; // chage this to heap

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
