import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-2 py-5 min-h-150">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
