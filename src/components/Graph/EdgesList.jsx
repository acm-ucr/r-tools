import { useMemo } from "react";
import EdgeEntry from "./EdgeEntry";

const EdgesList = ({ directed, weighted, data, setData, edges }) => {
  const count = useMemo(() => {
    let count = 0;
    Object.values(edges).forEach((vertex) => (count += vertex.length));
    return count;
  }, [edges]);
  return (
    <div className=" bg-rtools-blue-300 rounded-xl py-2 flex flex-col w-full">
      <div className="flex justify-between px-3">
        <div>edges</div>
        <div>
          <span className="text-sm text-rtools-blue-100 mr-1">count</span>
          <span className="font-bold text-sm">{count}</span>
        </div>
      </div>
      <div className="overflow-y-scroll px-3">
        {Object.entries(edges).map(([from, d]) =>
          d.map((to, index) => (
            <EdgeEntry
              key={index}
              from={from}
              to={to}
              data={data}
              setData={setData}
              directed={directed}
              weighted={weighted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EdgesList;
