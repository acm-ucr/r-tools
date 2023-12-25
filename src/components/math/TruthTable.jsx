import Table from "../Table";
import {
  getUniqueVariables,
  generateInputRows,
  generateOutputRows,
} from "@/util/math/TruthTable";

const TruthTable = ({ booleanEquations }) => {
  const uniqueVariables = getUniqueVariables(booleanEquations);
  const inputRows = generateInputRows(uniqueVariables.length);

  return (
    <div className="flex flex-row justify-center gap-1 max-h-[50vh] overflow-y-scroll">
      <Table matrix={inputRows} roundedLeft={true} header={uniqueVariables} />
      <Table
        matrix={generateOutputRows(
          uniqueVariables,
          booleanEquations,
          inputRows
        )}
        roundedRight={true}
        header={booleanEquations}
      />
    </div>
  );
};

export default TruthTable;
