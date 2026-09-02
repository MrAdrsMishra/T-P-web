import React, { useRef, useState } from "react";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyAJmx4X0P1n2jWypK0Vd5mpb3eC1csCFCg"; // Secure this in production
const topics = [
  // General Issues
  "Should governments regulate social media content?",
  "Is it ethical to use artificial intelligence for military purposes?",
  "Should there be limits on freedom of speech?",
  "Is animal testing for scientific research justified?",
  "Is cancel culture a form of accountability or mob rule?",
  "Should there be a universal basic income?",

  // Education
  "Should schools ban books that some find offensive?",
  "Is homework helpful or harmful to students?",
  "Should schools focus more on life skills than academics?",
  "Is college worth the cost?",
  "Should standardized tests be the primary measure of student ability?",

  // Social Issues
  "Should there be stricter gun control laws?",
  "Is the death penalty an effective deterrent to crime?",
  "Should governments provide free healthcare?",
  "Should the voting age be lowered to 16?",
  "Is social media harmful to teenagers?",

  // Technology
  "Are digital technologies a good thing for children?",
  "Should the internet be accessible to everyone?",
  "Is technology making us more isolated?",
  "Should there be stricter regulations on cryptocurrency?",

  // Environment
  "Should governments prioritize economic growth over environmental protection?",
  "Is climate change the biggest threat facing humanity?",
  "Should there be more regulations on fast fashion?",
  "Are genetically modified foods a solution to world hunger?",

  // Politics
  "Is democracy the best form of government?",
  "Should countries prioritize national interests over international cooperation?",
  "Is nationalism helpful or harmful?",
  "Should governments have the power to control family size?"
];

export default function Writex() {
  const [topic,setTopic] = useState(topics[Math.floor(Math.random() * topics.length)])
  const [text, setText] = useState("");
  const [words, setWords] = useState(0);
  const [backspaces, setBackspaces] = useState(0);
  const [timer, setTimer] = useState(0);
  const [grammarIssues, setGrammarIssues] = useState([]);
  const [deepFeedback, setDeepFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(true);

  const intervalRef = useRef(null);
  const isFirstKeystroke = useRef(false);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Count words and paragraphs
    const wordCount = newText.trim().split(/\s+/).filter(Boolean).length;
    const paraCount = newText
      .split(/\n+/)
      .filter((p) => p.trim() !== "").length;
    setWords(wordCount);

    // Start timer on first keystroke
    if (!isFirstKeystroke.current && newText.length > 0) {
      isFirstKeystroke.current = true;
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setBackspaces((prev) => prev + 1);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAll = () => {
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
    stopTimer();
    isFirstKeystroke.current = false;
    setText("");
    setWords(0);
    setBackspaces(0);
    setTimer(0);
    setGrammarIssues([]);
    setDeepFeedback("");
    setEvaluating(true);
  };

  const checkGrammarQuick = async () => {
    stopTimer();
    setLoading(true);
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ text, language: "en-US" }),
    });
    const data = await response.json();
    setGrammarIssues(data.matches);
    setLoading(false);
    setEvaluating(false);
  };

  const checkWithGEMINI = async () => {
    stopTimer();
    setLoading(true);
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You're a professional writing assistant. This is a writes-assessment content and you are the evaluater. I'm mentioning some points on which you have to tell the performance for the text as 
                {
                "weak areas":["",....,""],
                "Score_out of hundred": number
                }.
Note : the response must be in easy language and easy words should be used so no one feels it ai rsponse
1. Ensure ideas are laid out logically. with smooth transitions.
2.Cultivates key analytical skills; considers alternative viewpoints and counterarguments.
3.Consider other perspectives and potential criticisms.
4.Reflects good writing ability: uses clear, concise, and engaging language also
Proofread for grammar, punctuation, and spelling: maintain appropriate tone and style.
5.Meet all assignment requirements. including word count(under 400) and formatting.
just return me the only important suggestions weak areas under 50-60 words and an over all score.
Time limit for the test is 25 minutes,here is
time-taken=${timer}second, topic=${topic}, backspaces=${backspaces}
                ${text}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
        },
      }),
    });

    const result = await response.json();
    const feedback =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No feedback received.";
    setDeepFeedback(feedback);
    setLoading(false);
    setEvaluating(false);
  };

  return (
    <div className="w-4/5 h-full  p-6">
      <h1 className="text-2xl font-bold mb-4">Writex- Assessment</h1>
      <p className="h-10 max-w-content px-8 py-2 space-y-2 bg-gray-300 border rounded-md ">{topic}</p>
      <textarea
        className="w-full p-4 border rounded shadow"
        rows="10"
        placeholder="Start writing your essay here..."
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      ></textarea>

      <div className="mt-4 flex flex-wrap gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={checkGrammarQuick}
        >
          Quick Grammar Check
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={checkWithGEMINI}
        >
          Deep AI Feedback
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded"
          onClick={resetAll}
        >
          Reset
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Processing...</p>}

      {!evaluating && (
        <div className="mt-6 grid gap-2">
          <p>
            🧠 Word Count: <strong>{words}</strong>
          </p>
          <p>
            🧾 WPM: <strong>{Math.floor((words * 60) / timer)}</strong>
          </p>
          <p>
            ⌨️ Backspaces: <strong>{backspaces}</strong>
          </p>
          <p>
            ⏱️ Time: <strong>{timer}s</strong>
          </p>
        </div>
      )}

      {grammarIssues.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Quick Grammar Suggestions:</h2>
          <ul className="list-disc pl-5">
            {grammarIssues.map((issue, idx) => (
              <li key={idx}>
                <strong>{issue.message}</strong>
                <br />
                Suggestion:{" "}
                {issue.replacements.map((r) => r.value).join(", ") || "—"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {deepFeedback && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">AI Feedback (Gemini):</h2>
          <div className="bg-gray-100 p-4 rounded shadow whitespace-pre-wrap">
            {deepFeedback}
          </div>
        </div>
      )}
    </div>
  );
}
