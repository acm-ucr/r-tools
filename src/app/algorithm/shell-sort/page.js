"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/shellSort";
import { example } from "@/util/sort/shellSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Shell Sort"
      />
    </>
  );
};

export default page;
