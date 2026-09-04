import { lazy } from "react";

// Landing
export const AppLayout = lazy(() => import("../App.jsx"));
export const Login = lazy(() => import("../pages/Landing-Page/Login.jsx"));
export const Signup = lazy(() => import("../pages/Landing-Page/Signup.jsx"));
export const ForgotPassword = lazy(() => import("../pages/Landing-Page/ForgotPassword.jsx"));
export const Contact = lazy(() => import("../pages/Landing-Page/Contact.jsx"));
export const About = lazy(() => import("../pages/Landing-Page/About.jsx"));

// Student Dashboard
export const StudentDashboard = lazy(() => import("../pages/logged/StudentDashboard.jsx"));
export const Analysis = lazy(()=> import("../pages/logged/Student-Dashboard-Pages/Analysis.jsx"));
export const Welcome = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Welcome.jsx"));
export const StudentProfile = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Profile.jsx"));
export const Student_Profile = StudentProfile;
export const Practice = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Practice.jsx"));
export const OngoingTests = lazy(() => import("../pages/logged/Student-Dashboard-Pages/OngoingTests.jsx"));
export const CertificationsAndExperience=lazy(()=> import('../pages/logged/Student-Dashboard-Pages/CertificationsAndExperience.jsx'))
export const ProjectsAndSkills = lazy(() => import("../pages/logged/Student-Dashboard-Pages/ProjectsAndSkills.jsx"));
export const Quantative = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Quantative.jsx"));
export const Logical = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Logical.jsx"));
export const CoreFundamentals = lazy(() => import("../pages/logged/Student-Dashboard-Pages/CoreFundamentals.jsx"));
export const Verbal = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Verbal.jsx"));
export const PseudoCode = lazy(() => import("../pages/logged/Student-Dashboard-Pages/PseudoCode.jsx"));
export const CodeEditor= lazy(()=>import('../pages/logged/Student-Dashboard-Pages/CodeEditor.jsx'))
export const TestHistory = lazy(() => import("../pages/logged/Student-Dashboard-Pages/TestHistory.jsx"));
export const TermsConditions = lazy(() => import("../pages/logged/Student-Dashboard-Pages/TermsConditions.jsx"));
export const Writex = lazy(() => import("../pages/logged/Student-Dashboard-Pages/Writex.jsx"));
export const Assignments=lazy(()=> import('../pages/logged/Student-Dashboard-Pages/DailyAssignments.jsx'))
export const StartTest = lazy(() => import("../pages/logged/Student-Dashboard-Pages/test-components/StartTest.jsx"));
export const StudentSetting = lazy(()=>import("../pages/logged/Student-Dashboard-Pages/Setting.jsx"))
export const Student_Setting = StudentSetting;
// Admin Dashboard
export const AdminDashboard = lazy(() => import("../pages/logged/AdminDashboard.jsx"));
export const Admin_Home = lazy(()=>import("../pages/logged/Admin-Dashboard-Pages/AdminHome.jsx"))
export const Resources = lazy(() => import("../pages/logged/Admin-Dashboard-Pages/Resources.jsx"));
export const TestManagement = lazy(() => import("../pages/logged/Admin-Dashboard-Pages/TestManagement.jsx"));
export const Students = lazy(() => import("../pages/logged/Admin-Dashboard-Pages/Students.jsx"));
export const Queries = lazy(() => import("../pages/logged/Admin-Dashboard-Pages/Queries.jsx"));
export const Admin_Profile = lazy(()=> import("../pages/logged/Admin-Dashboard-Pages/Profile.jsx"));
export const Admin_Setting = lazy(()=> import("../pages/logged/Admin-Dashboard-Pages/Setting.jsx"));
export const AdminAnalytics = lazy(() => import("../pages/logged/Admin-Dashboard-Pages/AdminAnalytics.jsx"));