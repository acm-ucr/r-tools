"use client";

import { useState } from "react";
import { cpp } from "@codemirror/lang-cpp";
import { FaCircle } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import { coolGlow } from "thememirror";

const CodeView = ({ codes, editor, currLine }) => {
  const [select, setSelect] = useState(Object.keys(codes)[0]);
  return (
    <div className="rounded-lg bg-rtools-blue-300 w-full h-full pb-1">
      <div className="flex justify-between p-2 border-b-2 border-rtools-blue-100">
        <div className="flex items-center gap-2">
          <FaCircle className="text-rtools-pink-200 text-lg" />
          <FaCircle className="text-rtools-yellow-200 text-lg" />
          <FaCircle className="text-rtools-teal-200 text-lg" />
        </div>
        <div className="flex gap-2">
          {editor &&
            Object.keys(codes).map((language, index) => (
              <div
                onClick={() => setSelect(language)}
                key={index}
                className={`rounded-full px-4 text-center hover:cursor-pointer ${
                  select === language && "bg-rtools-blue-200"
                }`}
              >
                <p className="text-center m-0 p-0">{language}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded-xl bg-rtools-black mx-2.5 my-3 overflow-hidden">
        {editor && (
          <CodeMirror
            readOnly={true}
            value={codes[select]}
            height="70vh"
            extensions={[cpp()]}
            theme={coolGlow}
          />
        )}
        {!editor &&
          codes.map((line, index) => (
            <div
              key={index}
              className={`w-full px-3 py-1 ${
                index === currLine ? "bg-blue-400/40" : "bg-transparent"
              }`}
            >
              {line}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CodeView;
