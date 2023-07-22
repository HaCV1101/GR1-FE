import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getJobPendding } from "../../api";
import { Company, Job } from "../../types";
type ApplyJob = {
  schedule: string[];
  job: Job;
  company: Company;
};

function CandidateMyJob() {
  const [jobs, setJobs] = useState<ApplyJob[]>([]);
  useEffect(() => {
    getJobPendding().then(setJobs);
  }, []);
  return (
    <>
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
          JOBS ĐANG CHỜ
        </h1>
        {jobs.length === 0 ? (
          <h1>Không có job nào được accept</h1>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {jobs.map((job) => {
              return (
                <Box
                  key={job.job._id}
                  sx={{
                    width: "45%",
                    margin: "30px auto",
                    border: "2px solid orange",
                    borderRadius: "30px",
                    padding: "10px 20px",
                  }}
                >
                  <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
                    Ten cong ty:{" "}
                    <span style={{ fontSize: "25px", fontWeight: 300 }}>
                      {job.company.name}
                    </span>
                  </h1>
                  <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
                    Ten job:{" "}
                    <span style={{ fontSize: "25px", fontWeight: 300 }}>
                      {job.job.name}
                    </span>
                  </h1>
                  <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
                    Thoi gian:{" "}
                    <span style={{ fontSize: "25px", fontWeight: 300 }}>
                      Chưa quyết định
                    </span>
                  </h1>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
export default CandidateMyJob;
