"use client";

import Editor from "@monaco-editor/react";

const CodeView = () => {
  return (
    <div className="rounded-lg bg-rtools-blue-300">
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-rtools-pink-200" />
          <div className="p-1.5 rounded-full bg-rtools-yellow-200" />
          <div className="p-1.5 rounded-full bg-rtools-teal-200" />
        </div>
        <div className="flex gap-2">
          <div className="rounded-full px-4 text-center bg-rtools-blue-200">
            <p className="text-center m-0 p-0">C++</p>
          </div>
          <div className="rounded-full px-3">
            <p className="m-0 p-0">Python</p>
          </div>
          <div className="rounded-full px-3">
            <p className="m-0 p-0">Javascript</p>
          </div>
          <div className="rounded-full px-3">
            <p className="m-0 p-0">Java</p>
          </div>
          <div className="rounded-full px-3">
            <p className="m-0 p-0">C#</p>
          </div>
        </div>
      </div>
      <hr className="p-0 m-0 opacity-100 border-3 text-rtools-blue-100" />
      <div className="p-2" />
      <div className="px-2.5 pb-3">
        <div className={`rounded-xl bg-[#1e1e1e] w-full p-1`}>
          <Editor
            style={{ rounded: "lg" }}
            height="70vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-dark"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeView;
