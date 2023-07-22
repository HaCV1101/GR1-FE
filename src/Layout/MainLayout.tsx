import { Outlet } from "react-router-dom";
import { useAuth } from "../components/Auth";

const MainLayout = () => {
  const { isLoading } = useAuth();
  if (isLoading) return Loading;
  return (
    <>
      <Outlet />
    </>
  );
};
const Loading = (
  <div
    style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "#ffffff",
      display: "grid",
      placeItems: "center",
    }}
  >
    <h1>Loading...</h1>
  </div>
);
export default MainLayout;
