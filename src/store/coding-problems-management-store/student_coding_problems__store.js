import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/practice`,
});

// axios.interceptors.response.use(
//   (response) => {
//     return response.data?.data ?? response.data;
//   },
//   (error) => Promise.reject(error)
// );

const aceThemes = {
  Monokai: "monokai",
  Cobalt: "cobalt",
  Eclipse: "eclipse",
  GitHub: "github",
  Chrome: "chrome",
};

const Languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "c#", label: "C#" },
  { value: "go", label: "GO" },
];
const codeTemplates = {
  javascript: `function main() {
  console.log("Hello, World!");
}
main();`,

  python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,

  java: `
public class code {
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
    COUNT(*) AS count
FROM
    table_name
WHERE
    condition = 'value'
GROUP BY
    column1,
    column2
ORDER BY
    count DESC;`,
};

const initialState = {
  success: null,
  language: null,
  isRunning: false,
  code:null,
  data: {
    status: null,
    output: null,
    stderr: null,
    compile_output: null,
    time: null,
    memory: null,
  },
  problem: {
    problemStatement: null,
    inputExamples: {
      input: null,
      output: null,
      explaination: null,
    },
    constraints: [],
    notes: [],
  },
};
const checkCode = (set, get) => async (codeDataObj) => {
  set({ isRunning: true });
  try {
    const response = await api.post("/run-code", codeDataObj);

    const payload = response.data;

    set({
      success: payload.success,
      language: payload.language,
      data: {
        status: payload.data.status,
        output: payload.data.stdout,
        stderr: payload.data.stderr,
        compile_output: payload.data.compile_output,
        time: payload.data.time,
        memory: payload.data.memory,
      },
      isRunning: false,
    });
  } catch (error) {
    set({
      success: false,
      isRunning: false,
      data: {
        status: "Error",
        output: null,
        stderr:
          error?.response?.data?.message ||
          error?.message ||
          "Execution failed",
        compile_output: null,
        time: null,
        memory: null,
      },
    });
  }
};

const studentCodingProblemStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      aceThemes,
      Languages,
      codeTemplates,
      checkCode: checkCode(set, get),
    }),
    {
      name: "student-coding-data",
    }
  )
);

export default studentCodingProblemStore;
