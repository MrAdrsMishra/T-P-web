import React, { useRef, useState } from "react";
import AceEditor from "react-ace";

// Modes
import "ace-builds/src-noconflict/mode-java";

// Themes (you MUST import each one you want to use)
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-chrome";

import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = () => {
  const editorRef = useRef(null);

  const aceThemes = {
    // Dark
    Monokai: "monokai",
    Cobalt: "cobalt",
    Eclipse: "eclipse",

    // Light
    GitHub: "github",
    Chrome: "chrome",
  };

  const [theme, setTheme] = useState("monokai");

  const switchAceTheme = (newTheme) => {
    setTheme(newTheme);
    console.log(`Theme switched to: ${newTheme}`);
  };

  return (
    <div className="mx-auto w-full h-full">
      <h3>Ace Code Editor</h3>

      {/* Theme Selector */}
      <select
        value={theme}
        onChange={(e) => switchAceTheme(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        {Object.entries(aceThemes).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="w-full h-full border border-gray-500">
        <AceEditor
          ref={editorRef}
          mode="java"
          theme={theme}
          onChange={(v) => console.log("change", v)}
          name="UNIQUE_ID_OF_DIV"
          width="70%"
          height="100%"
          // editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            wrap: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
