import { lazy } from "react";

// Landing
export const AppLayout = lazy(() => import("../App.jsx"));
export const Login = lazy(() => import("../pages/Landing Page/Login.jsx"));
export const Signup = lazy(() => import("../pages/Landing Page/Signup.jsx"));
export const ForgotPassword = lazy(() => import("../pages/Landing Page/ForgotPassword.jsx"));
export const Contact = lazy(() => import("../pages/Landing Page/Contact.jsx"));
export const About = lazy(() => import("../pages/Landing Page/About.jsx"));

// Student Dashboard
export const Student_Dashboard = lazy(() => import("../pages/logged/Student_Dashboard.jsx"));
export const Analysis = lazy(()=> import("../pages/logged/student_dashboard_pages/Analysis.jsx"));
export const Welcome = lazy(() => import("../pages/logged/student_dashboard_pages/Welcome.jsx"));
export const Student_Profile = lazy(() => import("../pages/logged/student_dashboard_pages/Profile.jsx"));
export const Practice = lazy(() => import("../pages/logged/student_dashboard_pages/Practice.jsx"));
export const OngoingTests = lazy(() => import("../pages/logged/student_dashboard_pages/OngoingTests.jsx"));
export const ProjectsAndSkills = lazy(() => import("../pages/logged/student_dashboard_pages/ProjectsAndSkills.jsx"));
export const Quantative = lazy(() => import("../pages/logged/student_dashboard_pages/Quantative.jsx"));
export const Logical = lazy(() => import("../pages/logged/student_dashboard_pages/Logical.jsx"));
export const CoreFundamentals = lazy(() => import("../pages/logged/student_dashboard_pages/CoreFundamentals.jsx"));
export const Verbal = lazy(() => import("../pages/logged/student_dashboard_pages/Verbal.jsx"));
export const PseudoCode = lazy(() => import("../pages/logged/student_dashboard_pages/PseudoCode.jsx"));
export const CodeEditor = lazy(() => import("../pages/logged/student_dashboard_pages/CodeEditor.jsx"));
export const TestHistory = lazy(() => import("../pages/logged/student_dashboard_pages/TestHistory.jsx"));
export const TermsConditions = lazy(() => import("../pages/logged/student_dashboard_pages/TermsConditions.jsx"));
// export const Writex = lazy(() => import("../pages/logged/student_dashboard_pages/test-components/Writex.jsx"));
export const StartTest = lazy(() => import("../pages/logged/student_dashboard_pages/test-components/StartTest.jsx"));
export const Student_Setting = lazy(()=>import("../pages/logged/student_dashboard_pages/Setting.jsx"))
// Admin Dashboard
export const Admin_Dashboard = lazy(() => import("../pages/logged/Admin_Dashboard.jsx"));
export const Admin_Home = lazy(()=>import("../pages/logged/Admin_dashboard_pages/AdminHome.jsx"))
export const Resources = lazy(() => import("../pages/logged/Admin_dashboard_pages/Resources.jsx"));
export const TestManagement = lazy(() => import("../pages/logged/Admin_dashboard_pages/TestManagement.jsx"));
export const Students = lazy(() => import("../pages/logged/Admin_dashboard_pages/Students.jsx"));
export const Queries = lazy(() => import("../pages/logged/Admin_dashboard_pages/Queries.jsx"));
export const Performance = lazy(()=>import("../pages/logged/Admin_dashboard_pages/Performance.jsx"));
export const Admin_Profile = lazy(()=> import("../pages/logged/Admin_dashboard_pages/Profile.jsx"));
export const Admin_Setting = lazy(()=> import("../pages/logged/Admin_dashboard_pages/Setting.jsx"));