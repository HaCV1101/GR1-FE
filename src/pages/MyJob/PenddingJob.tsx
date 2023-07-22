import Header from "../../Layout/Header/Header";
import { isCompany, useAuth } from "../../components/Auth";
import CandidateMyJob from "../../components/MyJob/CandidateMyJob";
import CreateJob from "../../components/MyJob/CreateJob";
function MyJobs() {
  const { role, user } = useAuth();
  if (!user) return null;
  return (
    <>
      <Header />
      {isCompany(role, user) ? <CreateJob /> : <CandidateMyJob />}
    </>
  );
}

export default MyJobs;
