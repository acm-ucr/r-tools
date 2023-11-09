"use client";

import Input from "../Input";
import BoolToolBar from "./BoolToolBar";
import Header from "../Header";

const BoolWrapper = ({
  title,
  onClick,
  value,
  setValue,
  onChange,
  symbols,
  setSymbols,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Header text={title} />
      <div className="w-[36rem] mt-9">
        <Input
          placeholder="ex. A & B | C | (A' & B | C')"
          button={"ADD"}
          onClick={onClick}
          value={value}
          setValue={setValue}
          clear={true}
          thick={true}
          onChange={onChange}
        />
      </div>
      <div className="my-3">
        <BoolToolBar symbols={symbols} setSymbols={setSymbols} />
      </div>
    </div>
  );
};

export default BoolWrapper;
