"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { LANGUAGES } from "@/data/language";

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
const CodeView = ({ codes }) => {
  const [select, setSelect] = useState(Object.keys(codes)[0]);
  return (
    <div className="rounded-lg bg-rtools-blue-300">
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-rtools-pink-200" />
          <div className="p-1.5 rounded-full bg-rtools-yellow-200" />
          <div className="p-1.5 rounded-full bg-rtools-teal-200" />
        </div>
        <div className="flex gap-2">
          {Object.keys(codes).map((language, index) => (
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
      <hr className="p-0 m-0 opacity-100 border-3 text-rtools-blue-100" />
      <div className={`rounded-xl bg-[#1e1e1e] w-full p-1 mx-2.5 my-3`}>
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
      </div>
    </div>
  );
};

export default CodeView;
