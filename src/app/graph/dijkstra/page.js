import GraphAlgorithm from "@/components/Graph/Dijkstra";
import Header from "@/components/Header";

const page = () => {
  return (
    <>
      <Header text="Dijkstra" />
      <GraphAlgorithm />
    </>
  );
};

export default page;
