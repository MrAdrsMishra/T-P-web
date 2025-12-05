import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/practice`,
});

axios.interceptors.response.use(
  (response) => {
    // Support both shapes:
    // 1) Standard ApiResponse wrapper: { statusCode, data: {...}, message }
    //    -> response.data?.data
    // 2) Direct payload (e.g. { output, error, command })
    //    -> response.data
    return response.data?.data ?? response.data;
  },
  (error) => Promise.reject(error)
);

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
  javascript: 
`function main() {
  console.log("Hello, World!");
}
main();`,

  python: 
`def main():
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
    count DESC;`
};


const initialState = {
  output: null,
  code: null,
  error: null,
  language: "cpp",
  isRunning: false,
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
    console.log(codeDataObj)
    const result = await api.post("/run-code", codeDataObj);
    // result may be the raw payload or an object containing .output
    let resultOutput = result?.data?.output
    // console.log('run result:', resultOutput)
    set({ output:  resultOutput, isRunning: false });
  } catch (error) {
    // Try to extract useful error info
    const errPayload = error?.response?.data ?? error?.message ?? String(error);
    set({ error: errPayload, isRunning: false });
  }
};
const studentCodingProblemStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      aceThemes,
      Languages,
      codeTemplates,
      checkCode: checkCode(set,get)
    }),
    {
      name: "student-coding-data",
    }
  )
);

export default studentCodingProblemStore;
