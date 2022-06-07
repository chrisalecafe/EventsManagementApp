import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Iprops {
  allowedRoles: string[];
}
const RequireAuth = ({ allowedRoles }: Iprops) => {
  const { roles, isLoggedIn } = useAuth();
  const location = useLocation();

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
