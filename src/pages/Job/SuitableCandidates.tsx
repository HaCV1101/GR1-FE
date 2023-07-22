import { useEffect, useState, useMemo } from "react";
import Header from "../../Layout/Header/Header";
import { Box } from "@mui/material";
import { getListJob, getSuitableCandidates } from "../../api";
import { Job, SuitableCandidate } from "../../types";
import { isCompany, useAuth } from "../../components/Auth";
interface SuitableCandidatesType {
  candidates: SuitableCandidate[];
  job: Job;
}
function SuitableCandidates() {
  const { role, user } = useAuth();
  if (!user || !isCompany(role, user)) {
    return <h1>You are not company</h1>;
  }
  const [jobs, setJobs] = useState<Job[]>([]);
  const [suitableCandidates, setSuitableCandidates] = useState<
    SuitableCandidatesType[]
  >([]);
  const isLoading = useMemo(
    () => suitableCandidates.length === 0,
    [suitableCandidates]
  );
  useEffect(() => {
    getListJob().then(setJobs);
  }, []);
  useEffect(() => {
    const get = async () => {
      const result: SuitableCandidatesType[] = [];
      for (const job of jobs) {
        const jobId = job._id;
        const candidates: SuitableCandidate[] = await getSuitableCandidates(
          jobId
        );
        result.push({
          job,
          candidates,
        });
      }
      setSuitableCandidates(result);
    };
    get();
  }, [jobs]);

  return (
    <>
      <Header />
      {!isLoading && (
        <Box sx={{ margin: "80px auto", width: "80%" }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "60px",
              color: "transparent",
              backgroundImage: "linear-gradient(to right top, pink, red)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TRANG CHỦ
          </h1>
          {suitableCandidates
            .filter((candidates) => {
              return candidates.candidates.length != 0;
            })
            .map((s) => (
              <JobSuitableCandidate
                key={s.job._id}
                suitableCandidate={s}
              />
            ))}
        </Box>
      )}
    </>
  );
}
const JobSuitableCandidate = ({
  suitableCandidate: { candidates, job },
}: {
  suitableCandidate: SuitableCandidatesType;
}) => {
  console.log(candidates);

  return (
    <Box sx={{ mb: 7 }}>
      {/* JOB */}
      <Box
        sx={{
          width: "80%",
          margin: "30px auto",
          border: "2px solid orange",
          borderRadius: "30px",
          padding: "10px 20px",
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1, ml: 1 }}>
          <h1
            style={{
              lineHeight: "100px",
              fontWeight: 600,
              color: "orange",
              fontSize: "45px",
            }}
          >
            {job.name}
          </h1>
          <h1 style={{ fontSize: "30px", lineHeight: "70px" }}>
            Thời gian tuyển:{" "}
            <span style={{ fontSize: "28px", fontWeight: 300 }}>
              {job.recruitmentTime}
            </span>
          </h1>
          <h1 style={{ fontSize: "30px", lineHeight: "70px" }}>
            Loại công việc:{" "}
            <span style={{ fontSize: "28px", fontWeight: 300 }}>
              {job.jobType}
            </span>
          </h1>
          <h1 style={{ fontSize: "30px", lineHeight: "70px" }}>
            Mức lương :{" "}
            <span style={{ fontSize: "28px", fontWeight: 300 }}>
              {job.salary}
            </span>
          </h1>
        </Box>
        {/* Suitable candidate */}
        <Box sx={{ flex: 1, mr: 2 }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "50px",
              color: "transparent",
              backgroundImage: "linear-gradient(to right top, pink, red)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "100px",
              marginBottom: "20px",
            }}
          >
            ỨNG VIÊN PHÙ HỢP
          </h1>
          {candidates.map((candidate) => {
            return (
              <Box
                sx={{
                  border: "1px solid green",
                  borderRadius: "10px",
                  display: "flex",
                  mb: 3,
                }}
                key={candidate.phone}
              >
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={candidate.cv.avatar}
                    alt={candidate.fullname}
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "150px",
                      margin: " 10px 20px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    flex: 2,
                    margin: "10px",
                  }}
                >
                  <h1 style={{ fontSize: "25px", lineHeight: "50px" }}>
                    Tên:{" "}
                    <span style={{ fontWeight: "300" }}>
                      {candidate.fullname}
                    </span>
                  </h1>
                  <h1 style={{ fontSize: "25px", lineHeight: "50px" }}>
                    SĐT:{" "}
                    <span style={{ fontWeight: "300" }}>
                      {candidate.cv.contacts.phone}
                    </span>
                  </h1>
                  <h1 style={{ fontSize: "25px", lineHeight: "50px" }}>
                    Kỹ năng:{" "}
                    {candidate.cv.skills.map((skill) => {
                      return (
                        <>
                          <span
                            key={candidate.phone}
                            style={{ fontWeight: "300" }}
                          >
                            {skill.details.join(", ")}
                          </span>
                        </>
                      );
                    })}
                  </h1>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default SuitableCandidates;
