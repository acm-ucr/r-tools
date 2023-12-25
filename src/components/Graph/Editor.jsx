import { setEdgeWeight } from "@/util/editor/graphFunctions";
import ColorPicker from "./ColorPicker";
import Graph from "./Graph";
import { Toolbar } from "./Toolbar";
import { useEffect } from "react";

const Editor = ({
  data,
  setData,
  directed,
  weighted,
  undirectedEdge,
  size,
}) => {
  const handleUserKeyPress = (e) => {
    if (e.code.startsWith("Digit") && data.selectedEdge)
      setEdgeWeight(
        data,
        setData,
        data.selectedEdge.from,
        data.selectedEdge.to,
        parseInt(e.key)
      );
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [data]);
  return (
    <div className="flex flex-col gap-2">
      <Toolbar data={data} setData={setData} />
      <Graph
        width={size}
        height={size}
        directed={directed}
        weighted={weighted}
        setData={setData}
        data={data}
        editable={true}
        undirectedEdge={undirectedEdge}
      />
      <ColorPicker data={data} setData={setData} />
    </div>
  );
};

export default Editor;
