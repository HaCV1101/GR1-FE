import { useEffect, useState } from "react";
import "./CanProfile.scss";
import { Link } from "react-router-dom";
import CakeIcon from "@mui/icons-material/Cake";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { isCompany, useAuth } from "../../../components/Auth";
import { getCV } from "../../../api";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import EditProfile from "../EditProfile/EditProfile";
import { CVType } from "../../../types";
function CanProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const { role, user } = useAuth();
  if (!user || isCompany(role, user)) return null;
  const [CV, setCV] = useState<CVType>();
  useEffect(() => {
    getCV().then((v) => {
      setCV(v);
    });
  }, []);
  if (!CV) return null;
  return (
    <>
      {/* <Header /> */}
      <h1 className="header">MY PROFILE</h1>
      <div className="profile__page">
        <div
          className="container-profile"
          style={{ position: "relative" }}
        >
          <div className="header-profile">
            <img
              className="avatar"
              src={CV.avatar}
              alt="avatar"
            />
            <div className="introduce">
              <h1>MỤC TIÊU </h1>
              <p>{CV.goals}</p>
            </div>
            <div className="contact">
              <h1>THÔNG TIN LIÊN HỆ</h1>
              <ul>
                <li>
                  <CakeIcon sx={{ marginRight: "10px" }} />{" "}
                  <span>{CV.contacts.birthday}</span>
                </li>
                <li>
                  <PermIdentityIcon sx={{ marginRight: "10px" }} />{" "}
                  <span>{CV.contacts.gender}</span>
                </li>
                <li>
                  <FmdGoodIcon sx={{ marginRight: "10px" }} />{" "}
                  <p>{CV.contacts.address}</p>
                </li>
                <li>
                  <PhoneIcon sx={{ marginRight: "10px" }} /> {CV.contacts.phone}
                </li>
                <li>
                  <MailOutlineIcon sx={{ marginRight: "10px" }} />{" "}
                  {CV.contacts.mail}
                </li>
                <li>
                  <GitHubIcon sx={{ marginRight: "10px" }} />{" "}
                  <Link to={CV.contacts.github}>{CV.contacts.github}</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="detail">
            <div className="name">
              <h2>{user?.fullname}</h2>
              <p>{CV.applyPosition}</p>
            </div>
            <div className="education">
              <h1>HỌC VẤN</h1>
              {CV.education.map((edu, i) => {
                return (
                  <div
                    className="university"
                    key={i}
                  >
                    <div className="detailUni">
                      <h3>{edu.university}</h3>
                      <p>{edu.specialized}</p>
                      <p>{edu.graduationType}</p>
                    </div>

                    <p>{edu.period}</p>
                  </div>
                );
              })}
            </div>
            <div className="language">
              <h1>KỸ NĂNG</h1>
              <div className="both">
                {CV.skills.map((skill, i) => {
                  return (
                    <div
                      className="typeSkill"
                      key={i}
                    >
                      <h3>{skill.title}</h3>
                      <ul>
                        {skill.details.map((detail, i) => {
                          return <li key={i}>{detail}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="experience">
              <h1>KINH NGHIỆM</h1>
              {CV.experiences.map((edu, i) => {
                return (
                  <div
                    className="roles"
                    key={i}
                  >
                    <div className="detailRole">
                      <h3>{edu.position}</h3>
                      <p>{edu.company}</p>
                    </div>
                    <p>{edu.period}</p>
                  </div>
                );
              })}
            </div>
            <div className="hobbies">
              <h1>SỞ THÍCH</h1>
              <ul>
                {CV.hobbies.map((hobby: string, i: number) => {
                  return <li key={i}>- {hobby}</li>;
                })}
              </ul>
            </div>
          </div>
          <ModeEditIcon
            sx={{
              fontSize: 50,
              padding: "8px",
              position: "absolute",
              mt: 0,
              zIndex: 100,
              right: 0,
            }}
            onClick={showModal}
          />
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            sx={{ zIndex: 100 }}
          >
            <Box
              sx={{
                width: "50%",
                height: "100%",
                margin: "auto",
                overflowY: "scroll",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "64px",
                }}
              >
                <EditProfile
                  onClose={handleClose}
                  cv={CV}
                  onChangeCV={(v) => {
                    setCV(v);
                  }}
                />
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}
export default CanProfile;
