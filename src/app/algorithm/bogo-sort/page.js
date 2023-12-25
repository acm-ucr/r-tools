"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort } from "@/util/sort/bogoSort";
import { example } from "@/util/sort/bogoSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        sort={sort}
        example={example}
        title="Bogo Sort"
      />
    </>
  );
};

export default page;
