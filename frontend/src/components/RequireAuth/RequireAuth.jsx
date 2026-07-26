import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import HomeSkeleton from "../Home/HomeSkeleton";

function RequireAuth({ children }) {
  const { userData, isLoading } = useUser();

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;