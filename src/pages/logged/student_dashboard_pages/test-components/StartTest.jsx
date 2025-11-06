import React, { useEffect, useRef, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import useStudentTestStore from "../../../../store/test-management/student_test_store";
import { useSearchParams } from "react-router-dom";
import { use } from "react";
import useAuthStore from "../../../../store/user-auth-store/useAuthStore";
const sampleQuestions = [
  {
    id: 1,
    question: `A train running at 60 km/h crosses a pole in 30 seconds.
What is the length of the train?
Use basic speed-distance-time formula.`,
    options: ["300 m", "500 m", "600 m", "1800 m"],
    correctAnswer: "500 m",
  },
  {
    id: 2,
    question: `The ratio of ages of A and B is 4:5.
After 8 years, the ratio becomes 5:6.
Find the present age of A.`,
    options: ["24", "32", "40", "36"],
    correctAnswer: "32",
  },
  {
    id: 3,
    question: `A man sells an article at 10% loss.
If he had sold it for ₹50 more, he would’ve gained 5%.
Find the cost price.`,
    options: ["₹500", "₹400", "₹450", "₹550"],
    correctAnswer: "₹500",
  },
  {
    id: 4,
    question: `If A completes a work in 12 days and B in 16 days,
How many days will they take together?
Assume they work simultaneously.`,
    options: ["7", "6.8", "6.85", "6.86"],
    correctAnswer: "6.86",
  },
  {
    id: 5,
    question: `The population of a town increases by 10% annually.
If the current population is 50,000,
What was the population 2 years ago?`,
    options: ["41,322", "42,000", "45,000", "44,500"],
    correctAnswer: "41,322",
  },
  {
    id: 6,
    question: `A boat takes 6 hours to go downstream and 8 hours upstream.
If the river speed is 2 km/h,
Find the speed of the boat in still water.`,
    options: ["8 km/h", "10 km/h", "12 km/h", "14 km/h"],
    correctAnswer: "10 km/h",
  },
  {
    id: 7,
    question: `Two pipes can fill a tank in 20 and 30 minutes.
They are opened together, but the second pipe is closed after 10 mins.
How much more time will the first pipe take?`,
    options: ["6 min", "10 min", "8 min", "12 min"],
    correctAnswer: "6 min",
  },
  {
    id: 8,
    question: `A man borrowed ₹12,000 at 10% p.a.
He repaid ₹6,000 after 1 year.
How much interest did he pay after 2 years?`,
    options: ["₹2400", "₹1800", "₹1500", "₹2100"],
    correctAnswer: "₹2100",
  },
  {
    id: 9,
    question: `The average of 5 numbers is 60.
If one number is excluded, the average becomes 65.
Find the excluded number.`,
    options: ["35", "45", "55", "40"],
    correctAnswer: "35",
  },
  {
    id: 10,
    question: `A sum becomes double in 5 years at simple interest.
In how many years will it become 5 times?
Assume same rate of interest.`,
    options: ["20", "25", "18", "16"],
    correctAnswer: "20",
  },
];

const Comprehension = ({ onNext }) => {
  const {fullName,enrollment} = useAuthStore((state) => state.studentProfile);
  const {email} = useAuthStore((state)=> state.user)
  useEffect(() => {
    const goFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    };
    goFullscreen();
  }, []);
  return (
    <div className="flex justify-between">
      <div
        id="instructions"
        className="p-6 w-full h-screen px-auto bg-white shadow-md rounded-lg tracking-tight overflow-auto"
      >
        {/* header */}
        <div
          id="header"
          className="fixed top-0 w-full h-12 py-4 text-lg text-neutral-700 font-bold bg-white border-b-2 rounded-md  "
        >
          Infosys Aptitude test for Percentage
        </div>

        <h2 className="pt-12 text-lg font-bold mb-4  text-sky-400">
          General Instructions
        </h2>

        <ol className="list-decimal pl-5 space-y-2 text-gray-800">
          <li>
            The clock will be set at the server. The countdown timer at the top
            right corner of screen will display the remaining time available for
            you to complete the examination. When the timer reaches zero, the
            examination will end by itself. You need not terminate the
            examination or submit your paper.
          </li>
          <li>
            The Question Palette displayed on the right side of screen will show
            the status of each question using one of the following symbols:
            <ul className=" pl-6 mt-2 space-y-1">
              <li className="flex justify-start items-center space-x-2">
                <div className=" h-4 w-4 bg-red-600"></div>
                <span>Not visited</span>
              </li>
              <li className="flex justify-start items-center gap space-x-2">
                <div className=" h-4 w-4 bg-orange-400"></div>{" "}
                <span>Not answered</span>
              </li>
              <li className="flex justify-start items-center gap space-x-2">
                <div className=" h-4 w-4 bg-green-600"></div>{" "}
                <span>Answered</span>
              </li>
              <li className="flex justify-start items-center gap space-x-2">
                <div className=" h-4 w-4 bg-yellow-400"></div>{" "}
                <span>Marked for review (no answer)</span>
              </li>
              <li className="flex justify-start items-center gap space-x-2">
                <div className=" h-4 w-4 bg-pink-400"></div>{" "}
                <span>Answered & marked for review</span>
              </li>
            </ul>
            <div className="text-md tracking-tight">
              <b>Mark for Review:</b> status simply indicates that you would
              like to look at that question again. If a question is answered,
              but marked for review, then the answer will be considered for
              evaluation unless the status is modified by the candidate.
            </div>
          </li>
          <h2 className="pt-12 text-lg font-bold mb-4  text-sky-400">
            Navigating to a Question:
          </h2>

          <li>
            To answer a question:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Click on the question number in the Question Palette at the
                right of your screen to go to that numbered question directly.
                Note that using this option does NOT save your answer to the
                current question.
              </li>
              <li>
                Click on <strong>Save & Next</strong> to save your answer for
                the current question and then go to the next question.
              </li>
              <li>
                Click on<strong> Mark for Review & Next</strong> to save your
                answer for the current question and also mark it for review, and
                then go to the next question.
              </li>
              <strong>Note: </strong>rYour answer for the current question will
              not be saved if you navigate to another question directly by
              clicking on a question number without saving the answer to the
              previous question.
            </ul>
            You can view all the questions by clicking on the Question Paper
            button.{" "}
            <span className="text-red-500 font-medium">
              This feature is provided, so that if you want, you can just see
              the entire question paper at a glance.
            </span>
          </li>

          <h2 className="pt-12 text-lg font-bold mb-4  text-sky-400">
            Answering a Question:
          </h2>

          <li>
            Procedure for answering a multiple choice (MCQ) type question:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Select one option from A/B/C/D</li>
              <li>
                Choose one answer from the 4 options (A, B, C, D) given below
                the question, click on the <strong>bubble placed</strong> before
                the chosen option.
              </li>
              <li>
                To deselect your chosen answer, click on the{" "}
                <strong>bubble of the chosen option</strong> again or click on
                the Clear Response button
              </li>
              <li>
                To change your chosen answer, click on the bubble of another
                option.
              </li>
              <li>
                To save your answer, you MUST click on the{" "}
                <strong>Save & Next </strong>
              </li>
            </ul>
          </li>

          <h2 className="pt-12 text-lg font-bold mb-4  text-sky-400">
            Procedure for answering a numerical answer type question:
          </h2>

          <li>
            To enter a number as your answer, use the virtual numerical
            <ol className="list-disc pl-6 mt-2 space-y-1">
              <li>
                A fraction (e.g., -0.3 or -.3) can be entered as an answer with
                or without "0" before the decimal point.
              </li>
              <li>
                As many as four decimal points, e.g. 12.5435 or 0.003 or
                -932.6711 or 12.82 can be entered.
              </li>
              <li>To clear your answer, click on the Clear Response button.</li>
              <li>To save your answer, you MUST click on the Save & Next.</li>
              <li>
                To mark a question for review, click on the Mark for Review &
                Next button. If an answer is selected (for MCQ/MCAQ) or entered
                (for numerical answer type) for a question that is Marked for
                Review, that answer will be considered in the evaluation unless
                the status is modified by the candidate.
              </li>
              <li>
                To change your answer to a question that has already been
                answered, first select that question for answering and then
                follow the procedure for answering that type of question.
              </li>
              Note that ONLY Questions for which answers are saved or marked for
              review after answering will be considered for evaluation.
              <li>
                Sections in this question paper are displayed on the top bar of
                the screen. Questions in a Section can be viewed by clicking on
                the name of that Section. The Section you are currently viewing
                will be highlighted.
              </li>
              <li>
                After clicking the Save & Next button for the last question in a
                Section, you will automatically be taken to the first question
                of the next Section in sequence.
              </li>
              <li>
                You can move the mouse cursor over the name of a Section to view
                the answering status for that Section.
              </li>
            </ol>
          </li>
        </ol>

        <div className="mt-4 text-center">
          <div
            onClick={onNext}
            className="float-right px-6 py-2 bg-sky-300 text-white font-semibold rounded hover:bg-sky-700"
          >
            Start Test
          </div>
        </div>
      </div>
      <div className="p-4 min-w-72 bg-sky-50 flex flex-col justify-center items-center">
        <div className="w-20 h-20 border-gray-400 rounded-full bg-sky-300 flex items-center justify-center text-white font-bold text-lg">
          {fullName?.toUpperCase() || "USER"}
        </div>
        <ul className="text-gray-600 font-semibold mt-4 text-center">
          <li>{enrollment}</li>
          <li>{email}</li>
          <li> IES College of Technology</li>
        </ul>
      </div>
    </div>
  );
};
const Instruction = ({ onNext }) => {
  const {fullName,enrollment} = useAuthStore((state) => state.studentProfile);
  const {email} = useAuthStore((state)=> state.user)
  // console.log("student profile data in instruction page", {fullName,enrollment});
  return (
    <div className="w-full h-screen flex justify-between  ">
      {/* Left Panel - Instructions with scroll */}
      <div
        id="instructions"
        className="p-6  w-full h-full font-normal bg-white shadow-md rounded-lg overflow-y-auto"
      >
        <div className="h-3/5">
          <h2 className="text-center text-2xl font-bold mb-2 text-black-500">
            Infosys Aptitude – Fractions
          </h2>
          <div className=" text-md mb-6 text-gray-700 space-y-2">
            <p>
              🕒 <strong>Duration:</strong> 12 Minutes
            </p>
            <p>
              📊 <strong>Maximum Marks:</strong> 10
            </p>
          </div>

          <div className="text-md  mb-2 text-gray-800">
            Read the following instructions carefully:
          </div>
          <ol className="list-decimal text-md font-normal pl-5 space-y-1 tracking-tight text-gray-800">
            <li>
              The test contains <strong>10 total questions</strong>.
            </li>
            <li>
              Each question has <strong>4 options</strong>,out of which only one
              is correct.
            </li>
            <li>
              You must complete the test in <strong>12 minutes</strong>.
            </li>
            <li>Avoid gaussing as there is negative marking.</li>

            <li>
              You will be awarded 1 marks for each corrcet answer and -0.25 will
              be deducted for each wrong answer.
            </li>
            <li>
              There is no negative marking forquestions you have not attempted.
            </li>
            <li>
              The test can be taken <strong>only once</strong>.Make sure you
              complete the test before you submit/ close the browser
            </li>
          </ol>
        </div>

        <div className="h-1/5 mt-6 p-4 border-t rounded-md shadow-md border-gray-400">
          <h4 className="font-semibold text-gray-800 mb-2">☑️ Declaration:</h4>
          <input type="checkbox" id="agree" />{" "}
          <b className="text-gray-700 text-sm leading-3">
            I have read all the instructions carefully and have understood them.
            I agree not to cheat or use unfair means in this examination. I
            understand that using unfair means of any sort for my own or someone
            else’s advantage will lead to my immediate disqualification. The
            decision of Testbook.com will be final and cannot be appealed.
          </b>
        </div>
        <div className="h-20 flex justify-around items-center">
          <div
            onClick={onNext}
            className="px-6 py-2 h-10 bg-sky-300 text-white font-semibold rounded hover:bg-blue-700"
          >
            Start test
          </div>
        </div>
      </div>
      {/* //ght Panel - Profile  */}
      <div className="p-4 min-w-72 bg-sky-50 flex flex-col justify-center items-center">
        <div className="w-20 h-20 border-gray-400 rounded-full bg-sky-300 flex items-center justify-center text-white font-bold text-lg">
          {fullName?.toUpperCase() || "USER"}
        </div>
        <ul className="text-gray-600 font-semibold mt-4 text-center">
          <li>{enrollment}</li>
          <li>{email}</li>
          <li> IES College of Technology</li>
        </ul>
      </div>
    </div>
  );
};
const TestPage = ({ testId }) => {
  const getTestData = useStudentTestStore((state) => state.getTestData);
  const testData = useStudentTestStore((state) => state.ongoingTestData);
  const submitTest = useStudentTestStore((state) => state.submitTest);
  const status = useStudentTestStore((state) => state.status);
  const user = useStudentTestStore((state) => state.user);

  const [timer, setTimer] = useState(0); // set after data fetch
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewMarked, setReviewMarked] = useState({});
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // fetch test data
  useEffect(() => {
    console.log("Fetching test data for testId: in startTestPage ", testId);
    const getTestdata = async () => {
      await getTestData(testId);
    };
    getTestdata();
  }, [testId]);

  // initialize timer after testData is fetched
  useEffect(() => {
    if (testData?.duration) {
      setTimer(testData.duration * 60); // convert minutes to seconds
    }
  }, [testData]);

  // countdown timer
  useEffect(() => {
    if (!timer) return;
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timer]);

  if (!testData?.problems?.length) return <div>Loading...</div>;

  const currentQuestion = testData.problems[currentIndex];

  const handleOptionChange = (e) => {
    setAnswers({ ...answers, [currentQuestion._id]: e.target.value });
  };

  const handleClear = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion._id];
    setAnswers(newAnswers);
  };

  const handleMarkForReview = () => {
    setReviewMarked({ ...reviewMarked, [currentQuestion._id]: true });
  };

  const handleNext = () => {
    if (currentIndex < testData.problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmitTest = async () => {
   const res = await submitTest({ testId, answers });
    document.exitFullscreen();
    navigate("/student-dashboard/analysis", { replace: true });
  };  

  return (
    <div className="flex w-full h-screen">
      {/* Left panel */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-sky-700 mb-4">
            Question {currentIndex + 1} of {testData.problems.length}
          </h2>
          <div className="text-gray-600 font-semibold">
            ⏱ {Math.floor(timer / 60)}:
            {(timer % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <p className="text-lg mb-4 text-gray-800">
          {currentQuestion.problemStatement}
        </p>
        {currentQuestion.options.map((option, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              name={`q-${currentQuestion._id}`}
              value={option}
              checked={answers[currentQuestion._id] === option}
              onChange={handleOptionChange}
            />
            <label>{option}</label>
          </div>
        ))}

        {/* buttons */}
        <div className="flex justify-end mt-6 space-x-6">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
          >
            Clear
          </button>
          <button
            onClick={handleMarkForReview}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            Mark for Review
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div className="max-w-64 p-4 flex flex-col justify-center items-center space-y-4 border-l bg-gray-50">
        <div className="">
          {user?.fullName?.charAt(0).toUpperCase() || "USER"}
          {user?.enrollment}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {testData.problems.map((q, idx) => {
            const isAnswered = answers[q._id];
            const isMarked = reviewMarked[q._id];
            let bgColor = "bg-gray-500";
            if (isAnswered) bgColor = "bg-green-400";
            if (isMarked) bgColor = "bg-purple-400";

            return (
              <button
                key={q._id}
                className={`w-10 h-10 rounded-md text-white font-bold ${bgColor}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleSubmitTest}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          End Test
        </button>
      </div>
    </div>
  );
};

// const TestPage = ({ testId }) => {
//   const getTestData = useStudentTestStore((state) => state.getTestData);
//   const testData = useStudentTestStore((state) => state.ongoingTestProblemSet);
// //  testData={
// // _id  68ed30bb86980720c3759ad5
// // subjects ["Maths", "Reasoning"]
// // title "Master Aptitude and Reasoning "
// // description "Comprehensive Test for mastring aptitude and reasoning, top tailored"
// // for_branch  [  "Computer Science", "IT", "ECE", "EEE", "Mechanical", "Civil"]
// // for_batch "2022-2026"
// // duration 90
// // total_questions 25
// // total_marks 60
// // valid_till 2025-10-15T17:02:51.115+00:00
// // problems Array [{},{}]
// //   }
//   const [timer, setTimer] = useState(testData?.duration * 60 || 12 * 60); // in seconds
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [reviewMarked, setReviewMarked] = useState({});
//   const intervalRef = useRef(null);
//   let currentQuestion = testData.problems[currentIndex];
//   const navigate = useNavigate();
//   useEffect(() => {
//     const getTestdata = async () => {
//       const res = await getTestData(testId);
//       if(res?.status===200){
//         console.log("test data fetched successfully", res.data.data);
//       }
//     };
//     getTestdata();

//   }, []);
//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(intervalRef.current); // ✅ cleanup
//   }, []);

//   const handleOptionChange = (e) => {
//     setAnswers({
//       ...answers,
//       [currentQuestion.id]: e.target.value,
//     });
//   };

//   const handleClear = () => {
//     const newAnswers = { ...answers };
//     delete newAnswers[currentQuestion.id];
//     setAnswers(newAnswers);
//   };

//   const handleMarkForReview = () => {
//     setReviewMarked({
//       ...reviewMarked,
//       [currentQuestion.id]: true,
//     });
//   };
//   const handleSubmitTest = () => {
//     const exitFullscreen = () => {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen(); // Safari
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen(); // IE/Edge
//       }
//     };
//     exitFullscreen();
//     navigate("/student-dashboard", { replace: true });
//   };
//   useEffect(() => {
//     return () => {
//       if (document.fullscreenElement) {
//         document.exitFullscreen?.();
//       }
//     };
//   }, []);
//   const handleNext = () => {
//     if (currentIndex < testData.problmes.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   return (
//     <div className="flex w-full  h-screen">
//       {/* Left panel */}
//       <div className=" h-full flex-1 p-8 overflow-y-auto">
//         <div>
//           <div className="w-full flex justify-center items-center">
//             <h2 className="text-xl font-bold text-sky-700 mb-4">
//               Question {currentIndex + 1} of {testData.problmes.length}
//             </h2>
//             <div></div>
//           </div>

//           <div className="space-y-2">
//             <p className="text-lg mb-4 text-gray-800">
//               {currentQuestion.problemStatement}
//             </p>
//             {currentQuestion.options.map((option, idx) => (
//               <div key={idx} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name={`q-${idx}`}
//                   value={option}
//                   checked={answers[currentQuestion.id] === option}
//                   onChange={handleOptionChange}
//                 />
//                 <label>{option}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* buttons */}
//         <div className=" flex items-end justify-end enter mt-6 space-x-6">
//           <button
//             onClick={handleClear}
//             className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
//           >
//             Clear
//           </button>
//           <button
//             onClick={handleMarkForReview}
//             className="px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
//           >
//             Mark for Review
//           </button>
//           <button
//             onClick={handleNext}
//             className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Right panel - Question palette */}
//       <div className="max-w-64 p-4  flex flex-col justify-center items-center space-y-4 border-l bg-gray-50">
//         <div className="grid grid-cols-4 gap-2">
//           {testData.problems.map((q, idx) => {
//             const isAnswered = answers[q.id];
//             const isMarked = reviewMarked[q.id];

//             let bgColor = "bg-gray-500";
//             if (isAnswered) bgColor = "bg-green-400";
//             if (isMarked) bgColor = "bg-purple-400";

//             return (
//               <button
//                 key={q.id}
//                 className={`w-10 h-10 rounded-md text-white font-bold ${bgColor}`}
//                 onClick={() => setCurrentIndex(idx)}
//               >
//                 {idx + 1}
//               </button>
//             );
//           })}
//         </div>
//         <button
//           onClick={handleSubmitTest}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
//         >
//           end test
//         </button>
//       </div>
//     </div>
//   );
// };
const StartTest = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams?.get("testId");
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  return (
    <div>
      {step === 1 && <Comprehension onNext={nextStep} />}
      {step === 2 && <Instruction onNext={nextStep} />}
      {step === 3 && <TestPage testId={testId} />}
    </div>
  );
};
export default StartTest;
