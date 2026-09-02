import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { adminNavigation } from "../../shared/SidebarNavigation";

function AdminDashboard() {
  return <DashboardLayout navigation={adminNavigation} />;
}

export default AdminDashboard;
