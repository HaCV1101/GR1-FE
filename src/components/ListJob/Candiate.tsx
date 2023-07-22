import { useEffect, useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import "./Job.scss";
import { useNavigate } from "react-router-dom";
import { Job, SuitableJob } from "../../types";
import { getSuitableJobs } from "../../api";
const Candidate = () => {
  const [suitableJobs, setSuitableJob] = useState<SuitableJob[]>([]);
  useEffect(() => {
    getSuitableJobs().then(setSuitableJob);
  }, []);
  return (
    <div
      className="container"
      style={{
        margin: "75px auto",
        width: "80%",
      }}
    >
      {suitableJobs.map((suitableJob) => (
        <CompanyJob
          key={suitableJob.company._id}
          suitableJob={suitableJob}
        />
      ))}
    </div>
  );
};
const JobDes = ({ job }: { job: Job }) => {
  const navigate = useNavigate();
  return (
    <div className="job">
      <div className="jd">
        <h4>{job.name}</h4>
        <p>Thời gian tuyển: {job.recruitmentTime}</p>
        <p>Loại công việc: {job.jobType}</p>
        <p>Mức lương: {job.salary}</p>
      </div>
      <div className="apply">
        <button onClick={() => navigate(job._id)}>
          <h6>Apply</h6>
        </button>
        <p>{job.address}</p>
      </div>
    </div>
  );
};
const CompanyJob = ({
  suitableJob: { jobs, company },
}: {
  suitableJob: SuitableJob;
}) => {
  return (
    <div className="job_container">
      <div
        className="infor_company"
        style={{
          flex: 1.5,
          textAlign: "center",
          // borderRight: "2px solid #999",
        }}
      >
        <h1>{company.name}</h1>
        <Link to="${company.contacts.homepage}">
          <img
            className="img_company"
            src={company.avatar}
            alt="img-company"
          />
        </Link>
        <div className="infor">
          <div className="box_contact">
            <ul className="contact_company">
              <li>
                <FmdGoodIcon sx={{ marginRight: "10px" }} />
                <span>{company.contacts.address}</span>
              </li>
              <li>
                <PhoneIcon sx={{ marginRight: "10px" }} />
                <span>{company.contacts.phone}</span>
              </li>
              <li>
                <MailOutlineIcon sx={{ marginRight: "10px" }} />
                <span>{company.contacts.email}</span>
              </li>
              <li>
                <LanguageIcon sx={{ marginRight: "10px" }} />
                <Link to="/">{company.contacts.homepage}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="jobs_company">
        <h1>CÔNG VIỆC PHÙ HỢP</h1>
        <div className="jobs">
          {jobs.map((job) => (
            <JobDes
              key={job._id}
              job={job}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Candidate;
