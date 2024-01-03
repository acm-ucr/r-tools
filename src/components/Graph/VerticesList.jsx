import VerticesEntry from "./VerticesEntry";

const VerticesList = ({ data, setData, edges }) => {
  return (
    <div className="flex-grow bg-rtools-blue-300 rounded-xl py-2 px-3 h-[70vh] overflow-y-scroll">
      <div className="flex justify-between">
        <div>vertices</div>
        <div>
          <span className="text-sm text-rtools-blue-100 mr-1">count</span>
          <span className="font-bold text-sm">
            {Object.keys(data.vertices).length}
          </span>
        </div>
      </div>
      {Object.keys(data.vertices).map((id, index) => (
        <VerticesEntry
          key={index}
          id={id}
          data={data}
          setData={setData}
          edges={edges}
        />
      ))}
    </div>
  );
};

export default VerticesList;
