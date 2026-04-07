import React from "react";
import userImage from "../../../assets/Student.avif";
import useAuthStore from "../../../store/user-auth-store/useAuthStore";
const UserBLock = () => {
  const studentProfile = useAuthStore((state) => state.studentProfile) || {};
  const { email } = useAuthStore((state) => state.user) || {};
  const info = {
    Usrename: studentProfile.fullName || "User",
    Batch: studentProfile.batch || "N/A",
    Ranking: "175",
    RollNo: studentProfile.enrollment || "N/A",
    Course: "B.tech",
    Branch: studentProfile.branch || "N/A",
    Email: email || "",
    Phone: studentProfile.phone || "N/A",
  };
  const social_Links = {
    LinkedIn: studentProfile.social_Links?.LinkedIn || "N/A",
    GitHub: studentProfile.social_Links?.GitHub || "N/A",
    LeetCode: studentProfile.social_Links?.LeetCode || "N/A",
    GeekForGeeks: studentProfile.social_Links?.GeekForGeeks || "N/A",
  };
  const Photo = studentProfile.photo || userImage;
  return (
    <div className="flex flex-col md:flex-row justify-around items-center py-4 px-4 md:px-8 bg-white rounded-lg shadow-sm border border-gray-100 gap-4">
      {/* Left Image Section */}
      <div
        id="left"
        className="w-full md:w-1/4 flex justify-center items-center md:border-r border-primary-300"
      >
        <img
          src={Photo}
          alt="user"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover border rounded-xl"
        />
      </div>

      {/* Right Info Section */}
      <div className="w-full md:w-3/4 space-y-4">
        <div
          id="details"
          className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start text-xs md:text-sm md:pl-8"
        >
          {Object.entries(social_Links).map(([key, val]) => (
            <div key={key} className="flex items-center">
              <a href={val} className="border border-neutral-400 text-gray-800 px-2 py-1 rounded hover:bg-gray-100">
                {key}
              </a>
            </div>
          ))}
        </div>
        <div
          id="details"
          className="w-full"
        >
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm md:pl-8">
            {Object.entries(info).map(([key, val]) => (
              <div key={key} className="flex justify-start space-x-2">
                <span className="text-primary-600 font-medium truncate">{key}:</span>
                <span className="text-primary-500 truncate">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBLock;
