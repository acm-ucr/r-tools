"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { LANGUAGES } from "@/data/language";
import { FaCircle } from "react-icons/fa";

const setEditorTheme = (monaco) => {
  monaco.editor.defineTheme("my-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "B3EFB9" },
      { token: "keyword", foreground: "12D0D5" },
      { token: "number", foreground: "FF8AB4" },
      { token: "string", foreground: "FFC700" },
      { token: "tag", foreground: "BE8AFF" },
    ],
    colors: {
      "editor.foreground": "#FFFFFF",
    },
  });
};
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
          <Editor
            beforeMount={setEditorTheme}
            style={{ rounded: "lg" }}
            height="70vh"
            language={LANGUAGES[select]}
            value={codes[select]}
            theme="my-theme"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
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
