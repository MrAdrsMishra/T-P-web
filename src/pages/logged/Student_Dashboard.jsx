import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GraduationCap, Menu, MoonIcon, SunIcon } from "lucide-react";
import ToggleSwitch from "../../component/ToggleSwitch";
import Sidebar from "./Student_dashboard_pages/Sidebar";
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
      {/* Header (fixed top) */}

      <div className="hidden w-full h-14 px-10 border-b border-b-[#787e92] md:flex justify-between items-center sticky top-0 bg-primary-0 z-50">
        <NavLink to="/" className="flex items-center space-x-2">
          <GraduationCap size={32} className="text-primary-600" />
          <span className="text-2xl font-bold text-primary-900">T&P</span>
        </NavLink>
        <div className="w-28 sm:w-36  flex justify-around items-center ">
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
                  <NavLink to="profile"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Profile
                  </NavLink>
                  <NavLink to="setting"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Setting
                  </NavLink>
                  
                  <div onClick={handleLogout}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Log Out
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" h-full flex justify-between space-x-1 bg-gray-200">
        <div
          className="relative z-10 h-full hidden lg:block"
          style={{ width: rightWidth }}
        >
          <Sidebar />
          <div
            ref={resizerRef}
            onMouseDown={startDragging}
            className="absolute top-0 right-0 w-[4px] h-full cursor-ew-resize bg-transparent hover:bg-blue-400 transition-colors"
          />
        </div>
        {/* Scrollable Outlet */}
        <main className="flex-1 bg-gray-50 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Student_Dashboard;
