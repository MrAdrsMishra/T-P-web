import React, { useState } from "react";
import useAuthStore from "../../../store/user-auth-store/useAuthStore";

const Profile = () => {
  const [formData, setFormData] = useState({
    profilePic: null,
    mobile: "",
    email: "",
    username: "",
    batch: "",
    branch: "",
    github: "",
    leetcode: "",
    gfg: "",
    linkedin: "",
    about: "",
  });
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.table(formData);

  const finalFormData = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    finalFormData.append(key, value);
  });
  const res = await updateUserProfile(finalFormData);

  if (res.success) {
    alert("Profile updated successfully");
  } else {
    alert("Oops! profile updation failed");
  }
};


  return (
    <div className="w-full p-2 mb-8">
      <div className="px-4">
        <h3 className="text-center text-neutral-500">
          Hello User! Update Your Profile
        </h3>
        <form className="flex-col space-y-2">
          <div className="w-full flex justify-center items-center p-4">
            <div className="w-2/5">
              <div className="flex items-center justify-center w-32 h-32 border border-neutral-600 rounded-full">
                <label
                  htmlFor="profilePic"
                  className="cursor-pointer text-center w-full"
                >
                  <input
                    id="profilePic"
                    name="profilePic"
                    type="file"
                    className="hidden"
                    aria-label="Upload profile picture"
                    onChange={handleFileChange}
                  />
                  <span className="text-sm text-neutral-500">
                    Upload profile
                  </span>
                </label>
              </div>
            </div>
            <div
              id="contact"
              className="min-w-max border-blue-500 flex justify-start items-center space-x-2"
            >
              <div className="flex flex-col justify-center items-center space-x-2">
                <label className="form-label h-8 text-right">Mobile:</label>
                <label className="form-label h-8 text-right">Email:</label>
              </div>
              <div className="flex flex-col justify-center items-center space-y-1">
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-input min-w-56"
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input min-w-56"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start space-x-2">
            <div className="flex-col justify-start space-y-1">
              <label className="form-label h-12 text-right">Username:</label>
              <label className="form-label h-12 text-right">Batch:</label>
              <label className="form-label h-12 text-right">Branch:</label>
              <label className="form-label h-12 text-right">GitHub:</label>
              <label className="form-label h-12 text-right">LeetCode:</label>
              <label className="form-label h-12 text-right">GeekorGeeks:</label>
              <label className="form-label h-12 text-right">LinkedIn:</label>
              <label className="form-label h-12 text-right">About:</label>
            </div>
            <div className="flex-col justify-start space-y-3">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
              />
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="form-select"
              >
                <option className="text-neutral-400" value="">
                  select Batch
                </option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
              </select>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">select Branch</option>
                <option value="AIML">AIML</option>
                <option value="CSE">CSE</option>
                <option value="EC">EC</option>
                <option value="EX">EX</option>
                <option value="DS">DS</option>
                <option value="CY">CY</option>
                <option value="AIDS">AIDS</option>
                <option value="BS">BS</option>
              </select>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="leetcode"
                value={formData.leetcode}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="gfg"
                value={formData.gfg}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="form-input"
              />
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="form-input border rounded-xl"
                placeholder="Tell about yourself"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-28 h-10 max-w-32 border rounded-xl bg-neutral-400 hover:bg-neutral-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
