"use client";
import AlgorithmWrapper from "@/components/algorithm/AlgorithmWrapper";
import { code, sort, example } from "@/util/sort/bucketSort";

const page = () => {
  return (
    <>
      <AlgorithmWrapper
        code={code}
        type="tables"
        sort={sort}
        example={example}
        title="Bucket Sort"
      />
    </>
  );
};

export default page;
