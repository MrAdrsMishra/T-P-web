import React from "react";
import { NavLink } from "react-router-dom";

const Comprehension = ({ onNext }) => {
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
          <NavLink
            to="/test/instructions"
            className="float-right px-6 py-2 bg-sky-300 text-white font-semibold rounded hover:bg-sky-700"
          >
            Start Test
          </NavLink>
        </div>
      </div>
       <div className="p-4 min-w-72 bg-sky-50 flex flex-col justify-center items-center">
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

export default Comprehension;
