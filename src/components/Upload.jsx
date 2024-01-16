import { MdOutlineFileUpload } from "react-icons/md";

const Upload = ({ value, onChange, text }) => {
  return (
    <div className="w-full">
      <label className="rounded-full w-full border-3 border-solid text-rtools-white p-2 border-rtools-green hover:opacity-80 cursor-pointer">
        <div className="flex flex-cols-1 justify-center gap-3">
          <MdOutlineFileUpload className="text-3xl" />
          <div className="flex justify-center text-xl">{text}</div>
        </div>
        <input
          type="file"
          onChange={onChange}
          value={value}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default Upload;
