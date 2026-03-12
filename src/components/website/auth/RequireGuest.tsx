import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import { useLocation } from "react-router-dom";

export default function RequireGuest() {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user) return <Navigate to="/" state={{ from: location }} replace />;

  return <Outlet />;
}
