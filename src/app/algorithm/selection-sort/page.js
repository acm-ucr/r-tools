"use client";
import SortWrapper from "@/components/algorithm/SortWrapper";
import { code, sort } from "@/util/sort/selectionSort";

const page = () => {
  return (
    <>
      <SortWrapper code={code} sort={sort} />
    </>
  );
};

export default page;
