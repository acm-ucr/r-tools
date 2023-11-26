"use client";
import GraphPage from "@/components/Graph/GraphPage";
import Header from "@/components/Header";

const page = () => {
  return (
    <>
      <Header text="Directed Graph" />
      <GraphPage directed={true} />
    </>
  );
};

export default page;
