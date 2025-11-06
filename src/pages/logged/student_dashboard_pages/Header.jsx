import React, { useState } from "react";
import { ChevronDown, Globe, Sun, User } from "lucide-react";

const Header  = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div>
      <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-800">
              EduPlatform
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">EN</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Theme Switcher */}
            <button className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Sun className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                {/* <ChevronDown className="w-4 h-4" /> */}
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-20">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Settings
                    </a>
                    <hr className="my-2 border-gray-100" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Logout
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
