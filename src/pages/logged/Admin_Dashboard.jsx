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

      <Header />

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

export default Admin_Dashboard;
