import { COLORS } from "@/data/colors";

const VerticesEntry = ({ id, data, setData, edges }) => {
  return (
    <div
      key={id}
      onClick={() =>
        setData({
          ...data,
          selectedVertex: data.selectedVertex === id ? null : id,
        })
      }
      className={`${
        data.selectedVertex === id && "bg-rtools-blue-200"
      } my-2 hover:bg-rtools-blue-200 w-full py-1 px-2 rounded cursor-pointer duration-200`}
    >
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full ${
            data.vertices[id].color === "white"
              ? "bg-white"
              : COLORS[data.vertices[id].color].bgDark
          } mr-2`}
        />
        <div className="">{data.vertices[id].value}</div>
      </div>
      {data.selectedVertex === id &&
        edges[id] &&
        edges[id].map((to, index) => (
          <div
            key={index}
            className="flex items-center ml-4"
            onClick={() => setData({ ...data, selectedVertex: i })}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                data.vertices[to.to].color === "white"
                  ? "bg-white"
                  : COLORS[data.vertices[to.to].color].bgDark
              } mr-2`}
            />
            <div className="">{data.vertices[to.to].value}</div>
          </div>
        ))}
    </div>
  );
};

export default VerticesEntry;
