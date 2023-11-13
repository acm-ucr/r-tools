"use client";
import SortWraper from "@/components/algorithm/SortWraper";
import { code, sort } from "@/util/sort/selectionSort";

const page = () => {
  return (
    <>
      <SortWraper code={code} sort={sort} />
    </>
  );
};

export default page;
