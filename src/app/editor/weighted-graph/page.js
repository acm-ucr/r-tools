"use client";
import GraphPage from "@/components/Graph/GraphPage";
import Header from "@/components/Header";

const page = () => {
  return (
    <>
      <Header text="Weighted Graph" />
      <GraphPage weighted={true} />
    </>
  );
};

export default page;
