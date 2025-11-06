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
    <div className="md:flex justify-around items-center py-4 px-8 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Left Image Section */}
      <div
        id="left"
        className="md:w-1/4 flex justify-center items-center mb-4 md:mb-0 md:pr-8 md:border-r border-primary-300"
      >
        <img
          src={Photo}
          alt="user"
          className="max-w-52 min-w-32 max-h-52 min-h-40 object-cover border rounded-xl"
        />
      </div>

      {/* Right Info Section */}
      <div className="w-full space-y-4">
        <div
          id="details"
          className="flex space-x-6 justify-evenly text-md md:pl-8"
        >
          {Object.entries(social_Links).map(([key, val]) => (
            <div key={key} className="flex space-x-2 justify-evenly">
              <a href={val} className="border border-neutral-400 text-gray-800">
                {key}
              </a>
            </div>
          ))}
        </div>
        <div
          id="details"
          className="w-full flex justify-center"
        >
          <div className="w-full grid grid-cols-2 gap-x-6 gap-y-4 text-md md:pl-8">
            {Object.entries(info).map(([key, val]) => (
              <div key={key} className="flex justify-start space-x-2">
                <span className="text-primary-600 font-medium">{key}:</span>
                <span className="text-primary-500">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBLock;
