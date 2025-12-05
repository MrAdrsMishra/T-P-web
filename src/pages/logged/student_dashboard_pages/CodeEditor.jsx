import React, { useRef, useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import { Play, Save, Download, Upload, Settings } from "lucide-react";
import studentCodingProblemStore from "../../../store/coding-problems-management-store/student_coding_problems__store";
const CodeEditor = () => {
  const output = studentCodingProblemStore((state) => state.output);
  const isRunning = studentCodingProblemStore((state) => state.isRunning);
  const Languages = studentCodingProblemStore((state) => state.Languages);
  const codeTemplates = studentCodingProblemStore(
    (state) => state.codeTemplates
  );
  const aceThemes = studentCodingProblemStore((state) => state.aceThemes);
  const checkCode = studentCodingProblemStore((state) => state.checkCode);
  const [theme, setTheme] = useState("monokai");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [rightWidth, setRightWidth] = useState(600); // initial width in px
  const resizerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const runCode =async () => {
    // Use the store action to check/run code
    const codeDataObj = {
      selectedLanguage: language,
      userCode: code,
      userInput: "",
    };
    if (checkCode) await checkCode(codeDataObj);
    console.log(output)
  };
  const download = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language === "javascript" ? "js" : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const loadCode = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };
  const stopDragging = () => {
    isDragging.current = false;
    document.body.classList.remove("select-none");
  };

  const startDragging = (e) => {
    isDragging.current = true;

    startX.current = e.clientX; // starting mouse position
    startWidth.current = rightWidth; // starting width

    document.body.classList.add("select-none");
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - startX.current; // how much mouse moved
    const newWidth = startWidth.current + dx; // apply movement

    const minWidth = 500;
    const maxWidth = 900;

    setRightWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  };
  useEffect(() => {
    if (codeTemplates && language) {
      setCode(codeTemplates[language]);
    }
  }, [language, codeTemplates]);
  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);
  return (
    <div className="mx-auto w-full h-full">
      {/* Editor and Output */}
      <div className="flex flex-col h-full w-full min-h-full rounded-lg p-1">
        {/* customization layer */}
        <div className="py-2 w-full flex justify-between items-center">
          <div className="space-x-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="min-w-16 min-h-8 bg-gray-200  outline-none rounded-md"
            >
              {Languages.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <select
              value={theme} // <- current selected theme
              onChange={(e) => setTheme(e.target.value)} // <- update theme
              className="min-w-16 min-h-8 bg-gray-200 outline-none rounded-md"
            >
              {Object.entries(aceThemes).map(([label, value], index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="h-8 w-12 flex items-center justify-center text-white bg-gray-200 border rounded-lg disabled:bg-green-400 transition-colors"
            >
              {isRunning ? "..." : <Play color="gray" className="w-4 h-4" />}
            </button>

            <button
              onClick={download}
              className="h-8 w-12 flex items-center justify-center text-white bg-gray-200 border rounded-lg transition-colors"
            >
              <Save color="gray" className="w-4 h-4" />
            </button>

            <label className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                onChange={loadCode}
                className="hidden"
                accept=".js,.py,.java,.cpp,.c,.html,.css,.sql,.txt"
              />
            </label>

            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* writing layer */}
        <div className="flex-1 min-h-0 overflow-hidden border border-primary-500 rounded-md pb-4">
          <div className="flex w-full h-full relative">
            {/* Editor Panel (Resizable) */}
            <div
              style={{ width: rightWidth }}
              className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  Editor
                </span>
                <span className="text-xs text-gray-500">{language}</span>
              </div>
              <div className="flex-1 min-h-0">
                <AceEditor
                  mode={language}
                  theme={theme}
                  onChange={(v) => setCode(v)}
                  value={code}
                  name="UNIQUE_ID_OF_DIV"
                  width="100%"
                  height="100%"
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    displayIndentGuides:true,
                  }}
                />
              </div>
            </div>

            {/* Resizer Bar (Between editor and output) */}
            <div
              ref={resizerRef}
              onMouseDown={startDragging}
              className="w-[2px] cursor-ew-resize bg-transparent hover:bg-blue-400 transition-colors"
            ></div>
            {/* Output Panel */}
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 text-gray-600">{"_/>"}</div>
                  <span className="text-sm font-medium text-gray-700">
                    Output
                  </span>
                </div>
                <button
                  onClick={() =>
                    studentCodingProblemStore.setState({ output: "" })
                  }
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>

              <div
                className={`flex-1 min-h-0 overflow-auto p-4 font-mono text-sm border border-primary-200 ${
                  theme === "vs-dark"
                    ? "bg-gray-900 text-green-300"
                    : "bg-white text-green-600"
                }`}
              >
                <pre className="whitespace-pre-wrap">
                  {/* {output} */}
                  {output || "Output will appear here..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
