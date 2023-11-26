"use client";
import GraphPage from "@/components/Graph/GraphPage";
import Header from "@/components/Header";

const page = () => {
  return (
    <>
      <Header text="Weighted Graph" />
      <GraphPage directed={true} weighted={true} />
    </>
  );
};

export default page;
