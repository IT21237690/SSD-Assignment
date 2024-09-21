import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../components/ContextProvider/Context"; 

const ProtectedRoutes = () => {
  const { logindata } = useContext(LoginContext); // Fetch the user login data from context
  const token = localStorage.getItem("usersdatatoken"); // use local storage to check the token
  console.log("user",logindata )
  // Check if the user is logged in 
  return logindata || token ? <Outlet /> : <Navigate to="/mainlogin" />;
};

export default ProtectedRoutes;
