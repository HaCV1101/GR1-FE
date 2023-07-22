import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/Auth";

const AuthLayout = () => {
  const { login } = useAuth();
  if (login) return <Navigate to="/" />;
  return (
    <>
      <Outlet />
    </>
  );
};
export default AuthLayout;
