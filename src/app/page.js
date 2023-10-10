import BarChart from "@/components/charts/BarChart";

const Home = () => {
  return (
    <>
      <BarChart
        width={600}
        height={300}
        data={[
          { number: 4, highlight: false },
          { number: 10, highlight: false },
          { number: 5, highlight: false },
          { number: 5, highlight: false },
          { number: 6, highlight: false },
          { number: 7, highlight: false },
          { number: 9, highlight: false },
        ]}
      />
    </>
  );
};

export default Home;
