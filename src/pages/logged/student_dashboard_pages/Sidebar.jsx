import React, { useEffect, useState } from "react";
import { Home,KeyboardIcon, FileText, ChevronDown, ChevronRight, ChartArea, FolderDot, Award, NotebookPen, Clock10, Target, Calculator, Brain, Snowflake, Speech, CodeXml, Code, BookOpen, History, KeyboardOffIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { CgKeyboard } from "react-icons/cg";

// ✅ Corrected: use icon as Component references
const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    children: [
      {
        id: "analysis",
        label: "Analysis",
        icon: ChartArea,
        directTo: "student-dashboard/analysis",
      },
      {
        id: "student-skills",
        label: "Skills",
        icon: FolderDot,
        directTo: "student-dashboard/skills",
      },
      {
        id: "Certifications-Project",
        label: "Certifications",
        icon: Award,
        directTo: "student-dashboard/certifications-projects",
      },
    ],
  },
  {
    id: "tests",
    label: "Tests",
    icon: FileText,
    children: [
      {
        id: "Ongoing-tests",
        label: "Ongoing Tests",
        icon: NotebookPen,
        directTo: "student-dashboard/ongoing-tests",
      },
      {
        id: "Daily Assignments",
        label: "Daily Assignments",
        icon: Clock10,
        directTo: "student-dashboard/daily-works",
      },
      {
        id: "tests-history",
        label: "Tests History",
        icon: History,
        directTo: "student-dashboard/test-history",
      },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    icon: Target,
    children: [
      {
        id: "Quantative Aptitude",
        label: "Quantative Aptitude",
        icon: Calculator,
        directTo: "student-dashboard/quantative-apt",
      },
      {
        id: "Logical Aptitude",
        label: "Logical Aptitude",
        icon: Brain,
        directTo: "student-dashboard/logical-apt",
      },
      {
        id: "Core fundamentals",
        label: "Core Fundamentals",
        icon: Snowflake,
        directTo: "student-dashboard/core-fundamentals",
      },
      {
        id: "Verbal Practice",
        label: "Verbal Practice",
        icon: Speech,
        directTo: "student-dashboard/verbal-practice",
      },
      {
        id: "Pseudo Code",
        label: "Pseudo Code",
        icon: CodeXml,
        directTo: "student-dashboard/pseudo-code",
      },
    ],
  },
  {
    id: "code-editor",
    label: "Code Editor",
    icon: Code,
    directTo: "student-dashboard/code-editor",
  },
  {
    id: "Easy Writing",
    label: "Writex-Assessment",
    icon: KeyboardIcon,
    directTo: "student-dashboard/writex-assessment",
  },
  {
    id: "materials",
    label: "Materials",
    icon: BookOpen,
    directTo: "student-dashboard/materials",
  },
  {
    id: "Compete Mode",
    label: "Compete Mode",
    icon: BookOpen,
    directTo: "student-dashboard/compete-mode",
  },
  {
    id: "Suggestions",
    label: "Suggestions",
    icon: BookOpen,
    directTo: "student-dashboard/add-suggestions",
  },
];
const RenderItems = ({ items, openedOptions, handleClicked }) => {
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

const Sidebar = () => {
  const [openedOptions, setOpenedOptions] = useState({});

  useEffect(() => {
    const initialState = {};
    const collectIds = (items) => {
      items.forEach((item) => {
        initialState[item.id] = false;
        if (item.children?.length > 0) collectIds(item.children);
      });
    };
    collectIds(menuItems);
    setOpenedOptions(initialState);
  }, []);

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
            items={menuItems}
            openedOptions={openedOptions}
            handleClicked={handleClicked}
          />
        </div>
      </div>
  
  );
};

export default Sidebar;
