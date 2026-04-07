import React, { useRef, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import Sidebar from "./Admin_dashboard_pages/Sidebar";
import Header from "./Admin_dashboard_pages/Header";

function Admin_Dashboard() {
  const [openBar, setOpenBar] = useState(false);
  const [rightWidth, setRightWidth] = useState(300); // initial width in px
  const resizerRef = useRef(null);
  const isDragging = useRef(false);
 
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

 
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header (fixed top) */}
      <Header openBar={openBar} ToggleBar={ToggleBar} />

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

export default Admin_Dashboard;
