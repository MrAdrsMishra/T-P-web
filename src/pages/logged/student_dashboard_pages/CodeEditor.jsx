import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useCodeEditorStore } from "../../../store/coding-problems-management-store/CodeEditorStore.js";

function CodeEditor() {
  const [rightPanelWidth, setRightPanelWidth] = useState(350);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(
    () => window.innerWidth < 1100,
  );
  const layoutRef = useRef(null);

  const {
    selectedLanguage,
    openLanguages,
    userCode,
    userInput,
    output,
    executionTime,
    memoryUsage,
    isRunning,
    setLanguage,
    closeLanguage,
    setCode,
    setUserInput,
    runCode,
    theme,
    setTheme,
  } = useCodeEditorStore();

  // Monaco language mapping
  const languageMap = {
    c: "c",
    cpp: "cpp",
    python: "python",
    javascript: "javascript",
    typescript: "typescript",
    go: "go",
    golang: "go",
    rust: "rust",
    java: "java",
    csharp: "csharp",
    php: "php",
    ruby: "ruby",
    kotlin: "kotlin",
    swift: "swift",
    r: "r",
    bash: "shell",
  };
  const IdeThemeMap = {
    github: "vs-light",
    dracula: "vs-dark",
    monokai: "vs-dark",
    solarized: "vs-light",
    highcontrast: "hc-black",
  };

  const selectableLanguages = Object.keys(languageMap).filter(
    (lang) => lang !== "golang",
  );

  const monacoLanguage = languageMap[selectedLanguage] || "javascript";

  const fileNameMap = {
    c: "code.c",
    cpp: "code.cpp",
    python: "code.py",
    javascript: "code.js",
    typescript: "code.ts",
    go: "code.go",
    golang: "code.go",
    rust: "code.rs",
    java: "code.java",
    csharp: "code.cs",
    php: "code.php",
    ruby: "code.rb",
    kotlin: "code.kt",
    swift: "code.swift",
    r: "code.r",
    bash: "code.sh",
  };

  useEffect(() => {
    const onResize = () => {
      setIsCompactLayout(window.innerWidth < 1100);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isCompactLayout) {
      setIsDragging(false);
    }
  }, [isCompactLayout]);

  // Theme-aware colors effect
  useEffect(() => {
    const themeColors = {
      github: {
        bg: "#f6f8fa",
        text: "#24292e",
        border: "#d0d7de",
        panelBg: "#ffffff",
        headerBg: "#f6f8fa",
      },
      dracula: {
        bg: "#282a36",
        text: "#f8f8f2",
        border: "#44475a",
        panelBg: "#282a36",
        headerBg: "#21222c",
      },
      monokai: {
        bg: "#272822",
        text: "#f8f8f2",
        border: "#49483e",
        panelBg: "#272822",
        headerBg: "#1e1f1c",
      },
      solarized: {
        bg: "#fdf6e3",
        text: "#657b83",
        border: "#eee8d5",
        panelBg: "#fdf6e3",
        headerBg: "#eee8d5",
      },
      highcontrast: {
        bg: "#000000",
        text: "#eeb657ff",
        border: "#ffffff",
        panelBg: "#000000",
        headerBg: "#463926ff",
      },
    };

    const colors = themeColors[theme] || themeColors.github;
    const root = document.documentElement;
    root.style.setProperty("--bg-color", colors.bg);
    root.style.setProperty("--text-color", colors.text);
    root.style.setProperty("--border-color", colors.border);
    root.style.setProperty("--panel-bg", colors.panelBg);
    root.style.setProperty("--header-bg", colors.headerBg);
  }, [theme]);

  // Ctrl + Enter shortcut
  useEffect(() => {
    const shortcut = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    };

    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [runCode]);

  // Drag logic
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const container = layoutRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const newWidth = rect.right - e.clientX;
      const min = 300;
      const max = Math.max(min, Math.floor(rect.width * 0.55));

      setRightPanelWidth(Math.max(min, Math.min(max, newWidth)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "default";
    };

    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="h-full w-full rounded-[1.75rem] border border-stone-200/80 bg-white/85 p-4 shadow-[0_22px_55px_rgba(120,53,15,0.1)] backdrop-blur sm:p-5">
      <div
        ref={layoutRef}
        className={`flex h-full gap-4 ${isCompactLayout ? "flex-col" : ""}`}
      >
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col border border-(--border-color) rounded-xl overflow-hidden shadow-sm bg-(--panel-bg) transition-colors duration-200">
          <div className="border-b border-(--border-color) bg-(--header-bg)">
            <div className="flex items-center gap-1 overflow-x-auto px-2 py-2">
              {openLanguages.map((lang) => {
                const isActive = lang === selectedLanguage;
                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? "border-orange-500 bg-orange-100/70 text-orange-800"
                        : "border-(--border-color) bg-white/50 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span>{fileNameMap[lang] || `code.${lang}`}</span>
                    <span
                      role="button"
                      aria-label={`Close ${fileNameMap[lang] || `code.${lang}`}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeLanguage(lang);
                      }}
                      className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded text-[10px] leading-none opacity-70 hover:bg-black/10 hover:opacity-100"
                    >
                      x
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              width="100%"
              language={monacoLanguage}
              value={userCode}
              theme={IdeThemeMap[theme] || "vs-dark"}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                roundedSelection: true,
              }}
            />
          </div>
        </div>

        {/* Resizer */}
        {!isCompactLayout && (
          <div
            onMouseDown={() => setIsDragging(true)}
            className="w-1 cursor-col-resize rounded-full bg-stone-200 transition-colors hover:bg-orange-400"
          />
        )}

        {/* Right Panel */}
        <div
          style={{ width: isCompactLayout ? undefined : rightPanelWidth }}
          className={`flex flex-col gap-4 overflow-hidden ${isCompactLayout ? "w-full" : ""}`}
        >
          {/* Controls and Input */}
          <div className="flex flex-col border border-(--border-color) rounded-xl overflow-hidden shadow-sm bg-(--panel-bg) transition-colors duration-200">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 border-b border-(--border-color) bg-(--header-bg) items-center justify-end">
              <span className="mr-auto text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
                Run settings
              </span>
              <select
                value={selectedLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border border-(--border-color) px-2 py-1 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Select programming language"
              >
                {selectableLanguages.map((lang) => (
                  <option key={lang} value={lang} className="text-black">
                    {lang}
                  </option>
                ))}
              </select>

              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent border border-(--border-color) px-2 py-1 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Select editor theme"
              >
                {Object.keys(IdeThemeMap).map((t) => (
                  <option key={t} value={t} className="text-black">
                    {t}
                  </option>
                ))}
              </select>

              <button
                onClick={runCode}
                disabled={isRunning}
                className={`text-xs font-bold px-4 py-1.5 rounded transition shadow-sm ${
                  isRunning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white active:scale-95"
                }`}
              >
                {isRunning ? "Running..." : "Run code"}
              </button>
            </div>

            {/* Input Section */}
            <div className="px-4 py-2 border-b border-(--border-color) text-xs font-semibold opacity-70 bg-(--header-bg)">
              Stdin (Input)
            </div>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter program input here..."
              className="w-full h-32 p-3 bg-transparent text-sm font-mono outline-none resize-none placeholder:opacity-40"
            />
          </div>

          {/* Output Panel */}
          <div className="flex items-center justify-between rounded-lg border border-(--border-color) bg-(--panel-bg) px-3 py-2 text-xs">
            <span className="font-semibold opacity-70">Runtime metrics</span>
            <div className="flex gap-4 items-center">
              <span className="font-medium opacity-80">
                Time: {executionTime || "..."}
              </span>
              <span className="font-medium opacity-80">
                Mem: {memoryUsage || "..."}
              </span>
              {isRunning && (
                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col border border-(--border-color) rounded-xl overflow-hidden shadow-sm bg-(--header-bg) text-(--text-color)">
            <div className="px-4 py-2 border-b border-(--border-color) bg-(--header-bg) font-semibold text-xs flex justify-between items-center">
              <span>Output</span>
            </div>
            <div className="flex-1 p-4 overflow-auto whitespace-pre-wrap font-mono text-sm selection:bg-orange-200/70">
              {output || (
                <span className="opacity-40 italic">
                  Code output will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
