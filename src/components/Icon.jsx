import { COLORS } from "@/data/colors";
import { SIZE } from "@/data/size";

const Icon = ({ color, icon, size }) => {
  return (
    <div
      className={`${COLORS[color].bg} ${COLORS[color].text} ${SIZE[size]} rounded-sm p-1 aspect-square w-fit`}
    >
      {icon}
    </div>
  );
};

export default Icon;
