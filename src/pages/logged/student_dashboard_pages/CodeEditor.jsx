import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, Save, Download, Upload, Settings } from "lucide-react";;
 
const CodeEditor = () => {
  const [code, setCode] = useState(`// Welcome to the Code Editor
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test the function
console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}
`);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("light");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "hc-black", label: "High Contrast" },
  ];

  const codeTemplates = {
    javascript: `// JavaScript Template
function main() {
  console.log("Hello, World!");
}

main();`,
    python: `# Python Template
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
    java: `// Java Template
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `// C++ Template
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    c: `// C Template
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
    css: `/* CSS Template */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
    sql: `-- SQL Template
SELECT 
    column1,
    column2,
    COUNT(*) as count
FROM 
    table_name
WHERE 
    condition = 'value'
GROUP BY 
    column1, column2
ORDER BY 
    count DESC;`,
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage] || "");
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running code...\n");
    setTimeout(() => {
      if (language === "javascript") {
        try {
          const mockConsole = {
            log: (...args) => {
              setOutput((prev) => prev + args.join(" ") + "\n");
            },
          };
          const wrappedCode = code.replace(/console\.log/g, "mockConsole.log");
          const func = new Function("mockConsole", wrappedCode);
          func(mockConsole);
        } catch (error) {
          setOutput((prev) => prev + `Error: ${error}\n`);
        }
      } else {
        setOutput(
          (prev) =>
            prev +
            `Code execution for ${language} is simulated.\nOutput: Hello, World!\n`
        );
      }
      setIsRunning(false);
    }, 1000);
  };

  const saveCode = () => {
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

  // return (
  //   <div>
  //     <div className="box-border h-screen pb-2 px-2 flex flex-col space-y-1 overflow-auto">
  //       {/* Toolbar */}
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center space-x-3">
  //           <select
  //             value={language}
  //             onChange={(e) => handleLanguageChange(e.target.value)}
  //             className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
  //           >
  //             {languages.map((lang) => (
  //               <option key={lang.value} value={lang.value}>
  //                 {lang.label}
  //               </option>
  //             ))}
  //           </select>
  //           <select
  //             value={theme}
  //             onChange={(e) => setTheme(e.target.value)}
  //             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
  //           >
  //             {themes.map((t) => (
  //               <option key={t.value} value={t.value}>
  //                 {t.label}
  //               </option>
  //             ))}
  //           </select>
  //           </div>
  //           <div className="flex items-center justify- space-x-2">
  //             <button
  //               onClick={runCode}
  //               disabled={isRunning}
  //               className="h-8 w-12 flex items-center justify-center  text-white bg-gray-200 border rounded-lg disabled:bg-green-400 transition-colors"
  //             >
  //               {isRunning ? "..." : <Play color="gray" className="w-4 h-4" />}
  //             </button>
  //             <button
  //               onClick={saveCode}
  //               className="h-8 w-12 flex items-center justify-center  text-white bg-gray-200 border rounded-lg disabled:bg-green-400 transition-colors"
  //             >
  //               <Save color="gray" className="w-4 h-4" />
  //             </button>
  //             <label className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
  //               <Upload className="w-4 h-4" />
  //               <input
  //                 type="file"
  //                 onChange={loadCode}
  //                 className="hidden"
  //                 accept=".js,.py,.java,.cpp,.c,.html,.css,.sql,.txt"
  //               />
  //             </label>
  //             <div className="flex items-center space-x-3">
  //               <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
  //                 <Settings className="w-5 h-5" />
  //               </button>
  //               <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
  //                 <Download className="w-5 h-5" />
  //               </button>
  //             </div>
  //         </div>
  //       </div>

  //       {/* Editor and Output */}
  //       <div className="border border-primary-500 rounded-md pb-4 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 ">
  //         {/* Code Editor */}
  //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-auto">
  //           <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
  //             <span className="text-sm font-medium text-gray-700">Editor</span>
  //             <span className="text-xs text-gray-500">{language}</span>
  //           </div>
  //           <div className="h-96 lg:h-full">
  //             <Editor
  //               height="100%"
  //               language={language}
  //               theme={theme}
  //               value={code}
  //               onChange={(value) => setCode(value || "")}
  //               options={{
  //                 minimap: { enabled: false },
  //                 fontSize: 14,
  //                 lineNumbers: "on",
  //                 roundedSelection: false,
  //                 // scrollBeyondLastLine: false,
  //                 automaticLayout: true,
  //                 tabSize: 2,
  //                 wordWrap: "on",
  //               }}
  //             />
  //           </div>
  //         </div>
  //         {/* Output Panel */}
  //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-auto">
  //           <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
  //             <div className="flex items-center space-x-2">
  //               <Terminal className="w-4 h-4 text-gray-600" />
  //               <span className="text-sm font-medium text-gray-700">
  //                 Output
  //               </span>
  //             </div>
  //             <button
  //               onClick={() => setOutput("")}
  //               className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
  //             >
  //               Clear
  //             </button>
  //           </div>
  //           <div style={{backgroundColor:{theme}}} className="h-96 lg:h-full p-4 text-green-400 font-mono text-sm  border border-primary-200  ">
  //             <pre className="whitespace-pre-wrap">
  //               {output || "Output will appear here..."}
  //             </pre>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="h-screen flex flex-col px-2 pb-2 space-y-1 box-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
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
            onClick={saveCode}
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

      {/* Editor and Output */}
      <div className="flex-1 min-h-0 overflow-hidden border border-primary-500 rounded-md pb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor Panel */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">Editor</span>
            <span className="text-xs text-gray-500">{language}</span>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language={language}
              theme={theme}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 text-gray-600" >{"_/>"}</div>
              <span className="text-sm font-medium text-gray-700">Output</span>
            </div>
            <button
              onClick={() => setOutput("")}
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
              {output || "Output will appear here..."}
            </pre>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
