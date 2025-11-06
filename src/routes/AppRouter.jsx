import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./path";
import * as Pages from "./LazyImports.js";
const withSuspense = (Component) => (
  <Suspense fallback={<center>Loading...</center>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: withSuspense(Pages.AppLayout) },
  { path: ROUTES.LOGIN, element: withSuspense(Pages.Login) },
  { path: ROUTES.REGISTER, element: withSuspense(Pages.Signup) },
  { path: ROUTES.FORGOT_PASSWORD, element: withSuspense(Pages.ForgotPassword) },

  {
    path: ROUTES.STUDENT.ROOT,
    element: withSuspense(Pages.Student_Dashboard),
    children: [
      { index: true, element: withSuspense(Pages.Welcome) },
      { path: ROUTES.STUDENT.PRACTICE, element: withSuspense(Pages.Practice) },
      { path: ROUTES.STUDENT.CONTACT, element: withSuspense(Pages.Contact) },
      { path: ROUTES.STUDENT.STUDENT_PROFILE, element: withSuspense(Pages.Student_Profile) },
      { path: ROUTES.STUDENT.ABOUT, element: withSuspense(Pages.About) },
      { path: ROUTES.STUDENT.ANALYSIS, element: withSuspense(Pages.Analysis) },
      { path: ROUTES.STUDENT.SKILLS, element: withSuspense(Pages.ProjectsAndSkills) },
      { path: ROUTES.STUDENT.CERTIFICATIONS, element: withSuspense(Pages.ProjectsAndSkills) },
      { path: ROUTES.STUDENT.DAILY_WORKS, element: withSuspense(Pages.ProjectsAndSkills) },
      { path: ROUTES.STUDENT.ONGOING_TESTS, element: withSuspense(Pages.OngoingTests) },
      { path: ROUTES.STUDENT.TEST_HISTORY, element: withSuspense(Pages.TestHistory) },
      { path: ROUTES.STUDENT.QUANT, element: withSuspense(Pages.Quantative) },
      { path: ROUTES.STUDENT.LOGICAL, element: withSuspense(Pages.Logical) },
      { path: ROUTES.STUDENT.FUNDAMENTALS, element: withSuspense(Pages.CoreFundamentals) },
      { path: ROUTES.STUDENT.VERBAL, element: withSuspense(Pages.Verbal) },
      { path: ROUTES.STUDENT.PSEUDO, element: withSuspense(Pages.PseudoCode) },
      { path: ROUTES.STUDENT.CODE_EDITOR, element: withSuspense(Pages.CodeEditor) },
      { path: ROUTES.STUDENT.MATERIALS, element: withSuspense(Pages.About) },
      { path: ROUTES.STUDENT.COMPETE_MODE, element: withSuspense(Pages.About) },
      { path: ROUTES.STUDENT.ADD_SUGGESTIONS, element: withSuspense(Pages.About) },
      { path: ROUTES.STUDENT.WRITEX, element: withSuspense(Pages.Writex) },
      { path: ROUTES.STUDENT.STUDENT_SETTING, element: withSuspense(Pages.Student_Setting) },
    ],
  },

  {
    path: ROUTES.ADMIN.ROOT,
    element: withSuspense(Pages.Admin_Dashboard),
    children: [
      { index: true, element: withSuspense(Pages.Welcome) },
      { path: ROUTES.ADMIN.ADMIN_HOME, element: withSuspense(Pages.Admin_Home) },
      { path: ROUTES.ADMIN.RESOURCES, element: withSuspense(Pages.Resources) },
      { path: ROUTES.ADMIN.TEST_MANAGEMENT, element: withSuspense(Pages.TestManagement) },
      { path: ROUTES.ADMIN.STUDENTS, element: withSuspense(Pages.Students) },
      { path: ROUTES.ADMIN.QUERIES, element: withSuspense(Pages.Queries) },
      { path: ROUTES.ADMIN.PERFORMANCE, element: withSuspense(Pages.Queries) },
      { path: ROUTES.ADMIN.ADMIN_PROFILE, element: withSuspense(Pages.Admin_Profile) },
      { path: ROUTES.ADMIN.ADMIN_SETTING, element: withSuspense(Pages.Admin_Setting) },
    ],
  },

  {
    path: ROUTES.TEST.ROOT,
    children: [
      { path: ROUTES.TEST.START, element: withSuspense(Pages.StartTest) },
     
    ],
  },

  { path: ROUTES.STUDENT.TERMS, element: withSuspense(Pages.TermsConditions) },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
