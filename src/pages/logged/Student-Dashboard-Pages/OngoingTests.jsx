import React, { useEffect, useState } from "react";
import {
  Clock,
  Users,
  BookOpen,
  Play,
  Calendar,
} from "lucide-react";
import { format, differenceInDays, differenceInHours } from "date-fns";
import { useNavigate } from "react-router-dom";
import useStudentTestStore from "../../../store/test-management/student_test_store";
import { mockTests } from "../../../data/mockData";

const OngoingTests = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(null);

  // ✅ FIXED destructuring — no { } here
  const OngoingTestsInfo = useStudentTestStore(
    (state) => state.OngoingTestsInfo || []
  );
  const getAllOngoingTestsInfo = useStudentTestStore(
    (state) => state.getAllOngoingTestsInfo
  );
  const isLoading = useStudentTestStore((state) => state.isLoading);
  const error = useStudentTestStore((state) => state.error);

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const days = differenceInDays(new Date(endDate), now);
    const hours = differenceInHours(new Date(endDate), now) % 24;

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return "Ending soon";
  };

  useEffect(() => {
    const call = async () => {
      // console.log("Fetching ongoing tests from backend...");
      const response = await getAllOngoingTestsInfo();
    };
    call();
  }, [getAllOngoingTestsInfo]);
  const handleStartTest = (test) => {
    setSelectedTest(test);
    navigate(`/test/start-test?testId=${test.testId}`, { replace: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Ongoing Tests</h1>
        <div className="text-sm text-gray-600">
          {Array.isArray(OngoingTestsInfo) ? OngoingTestsInfo.length : 0} active tests
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading ongoing tests...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && (!Array.isArray(OngoingTestsInfo) || OngoingTestsInfo.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-600">No ongoing tests available</p>
        </div>
      )}

      {/* Active Tests Grid */}
      {!isLoading && Array.isArray(OngoingTestsInfo) && OngoingTestsInfo.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {OngoingTestsInfo.map((test, idx) => (
          <div
            key={idx}
            className="border border-sky-400 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h5 className="text-md font-medium text-sky-400 mb-2">
                  {test.title}
                </h5>
                <p className="text-gray-600 text-sm">{test.description}</p>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{test.duration || 30} minutes</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>{test.forBranch?.join(", ") || "All branches"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>2 attempts allowed</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Ends: {format(new Date(test.validTill), "MMM dd, yyyy")} •{" "}
                  {getTimeRemaining(test.validTill)}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleStartTest(test)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-sky-800 text-sky-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Start Test</span>
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default OngoingTests;

