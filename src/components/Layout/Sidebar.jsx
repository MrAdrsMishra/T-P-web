import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const RenderItems = ({ items = [], openedOptions, handleClicked }) => {
  if (!items || !Array.isArray(items)) return null;

  return items.map((item) => {
    const Icon = item.icon;
    const hasChildren = item.children?.length > 0;
    const isOpen = openedOptions[item.id];

    const Content = (
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded-md hover:bg-primary-200 cursor-pointer ${
          hasChildren ? "" : "pl-6"
        }`}
        onClick={() => hasChildren && handleClicked(item.id)}
      >
        {hasChildren &&
          (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        {Icon && <Icon size={16} />}
        <span>{item.label}</span>
      </div>
    );

    return (
      <div
        key={item.id}
        className="flex flex-col text-primary-700 text-base lg:text-lg"
      >
        {item.directTo && !hasChildren ? (
          <NavLink
            to={`/${item.directTo}`}
            className={({ isActive }) =>
              `block ${
                isActive
                  ? "bg-primary-300 text-primary-900 font-semibold"
                  : ""
              } rounded-md`
            }
          >
            {Content}
          </NavLink>
        ) : (
          Content
        )}

        {hasChildren && isOpen && (
          <div className="ml-4 pl-2 border-l border-gray-300">
            <RenderItems
              items={item.children}
              openedOptions={openedOptions}
              handleClicked={handleClicked}
            />
          </div>
        )}
      </div>
    );
  });
};

const Sidebar = ({ renderList = [] }) => {
  const [openedOptions, setOpenedOptions] = useState({});

  useEffect(() => {
    const initialState = {};
    const collectIds = (items) => {
      if (!items || !Array.isArray(items)) return;
      items.forEach((item) => {
        initialState[item.id] = false;
        if (item.children?.length > 0) collectIds(item.children);
      });
    };
    collectIds(renderList);
    setOpenedOptions(initialState);
  }, [renderList]);

  const handleClicked = (id) => {
    setOpenedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`fixed top-0 left-0 py-4 h-full bg-primary-100 border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out 
      lg:translate-x-0 lg:static lg:z-auto flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        <RenderItems
          items={renderList}
          openedOptions={openedOptions}
          handleClicked={handleClicked}
        />
      </div>
    </div>
  );
};

export default Sidebar;
