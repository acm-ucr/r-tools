import { COLORS } from "@/data/colors";

const Table = ({ matrix, rounded, roundedLeft, roundedRight, header }) => {
  return (
    <table
      className={`border-collapse bg-white text-rtools-blue-200 ${
        roundedLeft && "rounded-l-2xl"
      } ${roundedRight && "rounded-r-2xl"} ${rounded && "rounded-2xl"}`}
    >
      <tbody>
        <tr>
          {header.map((data, key) => (
            <th
              key={key}
              className="whitespace-nowrap text-center border-black border-1 p-2"
            >
              {data}
            </th>
          ))}
        </tr>
        {matrix.map((row, key) => (
          <tr key={key}>
            {row.map((data, key2) => (
              <td
                key={key2}
                className={`whitespace-nowrap border-black p-2 text-center border-1 ${
                  data.color && COLORS[data.color]
                }`}
              >
                {data.data || data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
