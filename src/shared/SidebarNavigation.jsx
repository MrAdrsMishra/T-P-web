
import {  Home, ChartArea, FolderDot, Award, FileText, 
  NotebookPen, Clock10, History, Target, Calculator, Brain, Snowflake, 
  Speech, CodeXml, Code, Keyboard as KeyboardIcon, BookOpen, 
  Users,
  MessageSquare,
  ExternalLink
} from "lucide-react";
export const studentNavigation = [
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
        directTo: "student-dashboard/skills-and-projects",
      },
      {
        id: "Certifications-Project",
        label: "Certifications",
        icon: Award,
        directTo: "student-dashboard/certifications-and-experiences",
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
        id: "Assignments",
        label: "Assignments",
        icon: Clock10,
        directTo: "student-dashboard/assignents",
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
export const adminNavigation=[
    {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    directTo: "admin-dashboard/dashboard",
    children: [],
  },
  {
    id: "tests",
    label: "Test Management",
    icon: FileText,
    directTo: "admin-dashboard/test-management",
    children: [],
  },
  {
    id: "students",
    label: "Manage Students",
    icon: Users,
    directTo: "admin-dashboard/manage-students",
    children: [],
  },
  {
    id: "queries",
    label: "Messages",
    icon: MessageSquare,
    directTo: "admin-dashboard/students-queries",
    children: [],
  },
  {
    id: "resources",
    label: "Resources",
    icon: ExternalLink,
    directTo: "admin-dashboard/resources",
    children: [],
  },
   
];