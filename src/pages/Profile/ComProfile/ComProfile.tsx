import { useEffect, useState } from "react";
import "./ComProfile.scss";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isCompany, useAuth } from "../../../components/Auth";
import { getListJob } from "../../../api";
import { Job } from "../../../types";

function ComProfile() {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [listJob, setListJob] = useState<Job[]>([]);

  useEffect(() => {
    (async () => {
      const listJob = await getListJob();
      setListJob(listJob);
    })();
  }, []);
  if (!user || !isCompany(role, user)) return null;
  return (
    <>
      <h1 className="company-name">{user.name}</h1>
      <div className="page_container">
        <div
          className="cover_company"
          style={{
            background: `url(${user.cover})`,
          }}
        ></div>
        <div className="infor">
          <div className="box_contact">
            <ul className="contact_company">
              <li>
                <FmdGoodIcon sx={{ marginRight: "10px" }} />
                <span>{user.contacts.address}</span>
              </li>
              <li>
                <PhoneIcon sx={{ marginRight: "10px" }} />
                <span>{user.phone}</span>
              </li>
              <li>
                <MailOutlineIcon sx={{ marginRight: "10px" }} />
                <span>{user.email}</span>
              </li>
              <li>
                <LanguageIcon sx={{ marginRight: "10px" }} />
                <Link to="/">{user.contacts.homepage}</Link>
              </li>
            </ul>
            <Link to="{user.contacts.homepage}">
              <img
                className="img_company"
                src={user.avatar}
                alt="img-company"
                style={{ marginTop: "30px" }}
              />
            </Link>
          </div>

          <div className="des-company">
            <h4>Giới thiệu công ty</h4>
            <p>{user.introCompany}</p>
          </div>
        </div>
        <div className="jobs">
          <h2>CÔNG VIỆC CỦA BẠN</h2>
          {listJob.map((job) => {
            return (
              <div
                key={job._id}
                className="job"
              >
                <div className="jd">
                  <h4>{job.name}</h4>
                  <p>Thời gian kết thúc tuyển: {job.recruitmentTime}</p>
                  <p>Loại công việc: {job.jobType}</p>
                  <p>Mức lương: {job.salary}</p>
                </div>
                <div className="apply">
                  <button onClick={() => navigate(`/job/${job._id}`)}>
                    <h6>CHI TIẾT</h6>
                  </button>
                  <p>{job.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ComProfile;
