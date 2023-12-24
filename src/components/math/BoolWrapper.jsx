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
  description,
}) => {
  return (
    <>
      <Header text={title} description={description} />
      <div className="w-3/5 my-6">
        <Input
          button="ADD"
          onClick={onClick}
          value={value}
          setValue={setValue}
          clear={true}
          thick={true}
          onChange={onChange}
        />
      </div>
      <BoolToolBar symbols={symbols} setSymbols={setSymbols} />
    </>
  );
};

export default BoolWrapper;
