import { Navigate } from "react-router-dom";
import { isCompany, useAuth } from "../components/Auth";
const HomePage = () => {
  const { role, user } = useAuth();
  if (!user) return null;
  return (
    <>
      {isCompany(role, user) ? (
        <Navigate to="/suitableCandidate" />
      ) : (
        <Navigate to="/job" />
      )}
    </>
  );
};

export default HomePage;
