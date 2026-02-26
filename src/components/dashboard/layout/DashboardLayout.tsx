import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <div>Dashboard layout</div>
      <Outlet />
    </div>
  );
}
