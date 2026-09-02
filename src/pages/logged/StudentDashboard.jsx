import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { studentNavigation } from "../../shared/SidebarNavigation";

function Student_Dashboard() {
  return <DashboardLayout navigation={studentNavigation} />;
}

export default Student_Dashboard;
