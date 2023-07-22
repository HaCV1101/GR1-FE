import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { bookSchedule, getJobAccepted } from "../../api";
import { Company, Job } from "../../types";
import Header from "../../Layout/Header/Header";
import { useAuth } from "../../components/Auth";
type ApplyJob = {
  schedule: string[];
  job: Job;
  company: Company;
  bookSchedule?: string;
};
function AcceptedJob() {
  const [jobs, setJobs] = useState<ApplyJob[]>([]);
  console.log(jobs);

  useEffect(() => {
    getJobAccepted().then(setJobs);
  }, []);
  return (
    <>
      <Header />
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
          CÔNG VIỆC ĐƯỢC CHẤP NHẬN
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
                <JobDetail
                  key={job.job._id}
                  job={job}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
const JobDetail = ({ job }: { job: ApplyJob }) => {
  const [bookScheduleV, setBookSchedule] = useState(job.bookSchedule);
  const [time, setTime] = useState<string>();
  const { user } = useAuth();
  const handleSetBookSchedule = () => {
    if (!user || !time) return alert("Vui long chon thoi gian");
    bookSchedule(job.job._id, user._id, time).then((v) => {
      setTime(v.bookSchedule);
      setBookSchedule(v.bookSchedule);
    });
  };
  return (
    <Box
      sx={{
        width: "45%",
        margin: "30px auto",
        border: "2px solid orange",
        borderRadius: "30px",
        padding: "10px 20px",
      }}
    >
      <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
        Tên công ty:{" "}
        <span style={{ fontSize: "25px", fontWeight: 300 }}>
          {job.company.name}
        </span>
      </h1>
      <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
        Tên công việc:{" "}
        <span style={{ fontSize: "25px", fontWeight: 300 }}>
          {job.job.name}
        </span>
      </h1>

      {!bookScheduleV ? (
        <Box>
          <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
            Thời gian:{" "}
            <span style={{ fontSize: "25px", fontWeight: 300 }}>
              Chưa xác định
            </span>
          </h1>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            {bookScheduleV ? (
              ""
            ) : (
              <select
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  padding: 7,
                  borderRadius: 10,
                }}
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              >
                <option>---select time---</option>
                {job.schedule.map((time) => {
                  return (
                    <option
                      key={time}
                      value={time}
                    >
                      {new Date(time).toLocaleString()}
                    </option>
                  );
                })}
              </select>
            )}
            <button
              style={{
                fontSize: "20px",
                backgroundColor: "pink",
                marginBottom: "10px",
              }}
              onClick={handleSetBookSchedule}
            >
              Chọn lịch
            </button>
          </Box>
        </Box>
      ) : (
        <h1 style={{ fontSize: "28px", lineHeight: "40px" }}>
          Thời gian:{" "}
          <span style={{ fontSize: "25px", fontWeight: 300 }}>
            {new Date(bookScheduleV).toLocaleString()}
          </span>
        </h1>
      )}
    </Box>
  );
};
export default AcceptedJob;
