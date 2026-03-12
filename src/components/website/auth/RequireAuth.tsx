import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook/reduxHooks";

export default function RequireAuth() {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate replace to="/login" />;
}
