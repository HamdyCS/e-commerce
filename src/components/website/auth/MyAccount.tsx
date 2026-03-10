import { Outlet } from "react-router-dom";
import MyAccountSidebar from "../sidebars/MyAccountSidebar";

export default function MyAccount() {
  return (
    <div className="flex gap-5 relative">
      <MyAccountSidebar />
      <div className="grow p-5 flex items-center justify-center ">
        <Outlet />
      </div>
    </div>
  );
}
