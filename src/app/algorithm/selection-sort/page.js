"use client";
import SortWrapper from "@/components/algorithm/SortWrapper";
import { code, sort } from "@/util/sort/selectionSort";
import { example } from "@/util/sort/selectionSort";

const page = () => {
  return (
    <>
      <SortWrapper
        code={code}
        sort={sort}
        example={example}
        title="Selection Sort"
      />
    </>
  );
};

export default page;
