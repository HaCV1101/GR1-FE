import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/Auth";

const PrivateLayout = () => {
  const { login } = useAuth();
  if (!login) return <Navigate to="/login" />;
  return (
    <>
      <Outlet />
    </>
  );
};
export default PrivateLayout;
