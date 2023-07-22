import Header from "../../Layout/Header/Header";
import { isCompany, useAuth } from "../../components/Auth";
import CanProfile from "./CanProfile/CanProfile";
import ComProfile from "./ComProfile/ComProfile";
function Profile() {
  const { role, user } = useAuth();
  if (!user) return null;
  return (
    <>
      <Header />
      {isCompany(role, user) ? <ComProfile /> : <CanProfile />}
    </>
  );
}

export default Profile;
