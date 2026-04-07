import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GraduationCap, Menu, MoonIcon, SunIcon } from "lucide-react";
import ToggleSwitch from "../../component/ToggleSwitch";
import Sidebar from "./student_dashboard_pages/Sidebar";
import useAuthStore from "../../store/user-auth-store/useAuthStore";
function Student_Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const [rightWidth, setRightWidth] = useState(300); // initial width in px
  const resizerRef = useRef(null);
  const isDragging = useRef(false);
  const logout = useAuthStore((state)=>state.logout);
  const navigate = useNavigate();

  const startDragging = () => {
    isDragging.current = true;
    document.body.classList.add("select-none");
  };

  const stopDragging = () => {
    isDragging.current = false;
    document.body.classList.remove("select-none");
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;
    const minWidth = 265;
    const maxWidth = 400;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX));
    setRightWidth(newWidth);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);
  const ToggleBar = () => {
    setOpenBar(!openBar);
  };

  const handleLogout = async ()=>{
    const result =  await logout();
    if(result){
      navigate("/");
    }
  }
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header (always visible on mobile, responsive) */}
      <div className="w-full h-14 md:h-16 px-3 md:px-10 border-b border-b-[#787e92] flex justify-between items-center sticky top-0 bg-primary-0 z-50">
        <NavLink to="/" className="flex items-center space-x-2">
          <GraduationCap size={24} className="md:size-32} text-primary-600" />
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
                  <NavLink to="profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Profile
                  </NavLink>
                  <NavLink to="setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Setting
                  </NavLink>

                  <div onClick={handleLogout} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Log Out
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full flex justify-between bg-gray-200 overflow-hidden">
        {/* Sidebar - Responsive */}
        <div
          className={`absolute md:relative z-40 md:z-10 h-full md:flex flex-col transition-all duration-300 ${
            openBar ? "left-0" : "-left-full md:left-0"
          }`}
          style={{ width: openBar ? "100%" : rightWidth }}
        >
          <div className="flex-1 overflow-auto">
            <Sidebar />
          </div>
          {/* Resizer - only visible on larger screens */}
          <div
            ref={resizerRef}
            onMouseDown={startDragging}
            className="hidden md:block absolute top-0 right-0 w-[4px] h-full cursor-ew-resize bg-transparent hover:bg-blue-400 transition-colors"
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {openBar && (
          <div
            className="md:hidden absolute inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setOpenBar(false)}
          />
        )}

        {/* Scrollable Outlet */}
        <main className="flex-1 bg-gray-50 p-2 md:p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Student_Dashboard;
