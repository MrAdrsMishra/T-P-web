import React from "react";
import { Menu, Bell, Search, GraduationCap } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ToggleSwitch from "../../../component/ToggleSwitch";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import useAuthStore from "../../../store/user-auth-store/useAuthStore";

const Header = ({ openBar, ToggleBar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-14 md:h-16 px-3 md:px-10 border-b border-b-[#787e92] flex justify-between items-center sticky top-0 bg-primary-0 z-50">
      <NavLink to="/" className="flex items-center space-x-2">
        <GraduationCap size={10} className="md:size-12 text-primary-600" />
        <span className="text-lg md:text-2xl font-bold text-primary-900 hidden sm:inline">T&P</span>
      </NavLink>

      {/* Mobile Menu Button - visible only on small screens */}
      <button
        onClick={ToggleBar}
        className="md:hidden flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-primary-600" />
      </button>

      {/* Desktop Controls - hidden on mobile */}
      <div className="hidden md:flex w-28 sm:w-36 justify-around items-center">
        <ToggleSwitch />
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <CgProfile className="mt-1" />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-20">
                <NavLink
                  to="profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Setting
                </NavLink>

                <div
                  onClick={handleLogout}
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Log Out
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
