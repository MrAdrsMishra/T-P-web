import { NavLink } from "react-router-dom";

const Instruction = ({ onNext }) => {
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
         <NavLink
            to="/test/comprehension"
            onClick={onNext}
            className="px-6 py-2 h-10 bg-sky-300 text-white font-semibold rounded hover:bg-blue-700"
          >
            previous page
          </NavLink>
          <NavLink
            to="/test/test-started"
            onClick={goFullscreen}
            className="px-6 py-2 h-10 bg-sky-300 text-white font-semibold rounded hover:bg-blue-700"
          >
            Start test
          </NavLink>
        </div>
      </div>
      {/* //ght Panel - Profile  */}
      <div className="p-4 min-w-64 bg-sky-50 flex flex-col justify-center items-center">
        <div className="w-20 h-20 border-gray-400 rounded-full bg-sky-300 flex items-center justify-center text-white font-bold text-lg">
          ADARSH
        </div>
        <ul className="text-gray-600 font-semibold mt-4 text-center">
          <li>Roll: 0177AL221004</li>
          <li>College: IES College of Technology</li>
        </ul>
      </div>
    </div>
  );
};

export default Instruction;
