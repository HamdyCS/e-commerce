import { Outlet } from "react-router-dom";
import MyAccountSidebar from "../sidebars/MyAccountSidebar";

export default function MyAccountLayout() {
  return (
    <div className="flex relative">
      <MyAccountSidebar />
      <div className="grow p-5 flex items-center justify-center ">
        <Outlet />
      </div>
    </div>
  );
}
