import { LiaTimesSolid } from "react-icons/lia";

const Equations = ({ equations, setEquations }) => {
  const removeEquation = (index) => {
    setEquations([
      ...equations.slice(0, index),
      ...equations.slice(index + 1, equations.length),
    ]);
  };

  return (
    <div className="w-64 bg-blue-300/10 rounded-2xl divide-y-[1px] divide-blue-100 px-3">
      {equations.map((equation, index) => (
        <div
          key={index}
          className="group flex my-2 justify-between items-center"
        >
          {equation}
          <LiaTimesSolid
            onClick={() => removeEquation(index)}
            className="hidden group-hover:block text-slate-400 hover:text-white hover:cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default Equations;
