import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = null;
  console.log("user", user);
  return user ? <Outlet /> : <Navigate to="/mainlogin" />;
};

export default ProtectedRoutes;
