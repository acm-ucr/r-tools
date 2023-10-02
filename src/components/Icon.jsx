import { COLORS } from "@/data/icons";
import { SIZE } from "@/data/icons";

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
