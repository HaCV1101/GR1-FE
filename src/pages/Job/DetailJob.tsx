import React, { useEffect, useState } from "react";
import "./DetailJob.scss";
import Header from "../../Layout/Header/Header";
import { useParams } from "react-router-dom";
import { CVType, Job, User } from "../../types";
import {
  getCandidates,
  getJob,
  sendApply,
  rejectCandidate,
  setSchedules,
  acceptCandidate,
} from "../../api";
import { Box, Button, Modal, Typography } from "@mui/material";
import { isCompany, useAuth } from "../../components/Auth";
import ApplyModal from "./ApplyModal";
import CVModal from "./CVModal";
import Schedules from "./Schedules";

function DetailJob() {
  const { user, role } = useAuth();
  if (!user) return null;

  const { id } = useParams();
  const [job, setJob] = useState<Job>();
  const [status, setStatus] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [bgcolor, setBgColor] = useState("orange");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cv, setCv] = useState<CVType>();
  const [fullname, setFullname] = useState("");
  const [schedule, setSchedule] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<
    (Omit<User, "cv"> & {
      cv: CVType;
      status: "pending" | "accept" | "reject";
      bookSchedule?: string;
    })[]
  >();

  useEffect(() => {
    if (!id) return;
    getJob(id).then(setJob);
  }, [id]);
  useEffect(() => {
    async function f() {
      if (!id || !user || !isCompany(role, user)) return;
      const result = await getCandidates(id);
      setCandidates(result);
    }
    f();
  }, [id]);

  if (!job) return null;
  const showModal = (cv: CVType, fullname: string) => {
    setFullname(fullname);
    setCv(cv);
    setIsModalOpened(true);
  };
  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleAccept = (jobId: string, userId: string) => {
    if (schedule.length < 3)
      return alert("Bạn không thể accecpt nếu như chưa đặt lịch");
    setSchedules(jobId, userId, schedule);
    acceptCandidate(jobId, userId);
    setStatus("accepted");
  };

  const handleReject = (jobId: string, userId: string) => {
    rejectCandidate(jobId, userId);
    setStatus("rejected");
  };

  const handleApplyClick = () => {
    if (!id) return;
    sendApply(id)
      .then(() => {
        setIsModalOpen(true);
        setDisable(true);
        setBgColor("#ccc");
      })
      .catch((error) => {
        if (error === "applied") {
          alert("Bạn đã ứng tuyển công việc này!");
        }
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleCloseSCD = () => {
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      <Header />
      <div className="_container">
        <div className="title">
          <img
            className="img"
            src="https://i.pinimg.com/originals/82/88/12/828812007e1f0c5019ae46f4a29bcda2.jpg"
            alt="img job"
            style={{ marginBottom: " 30px" }}
          />
          <div className="title_text">
            <h1>{job.name}</h1>
          </div>
        </div>
        <div className="_body">
          <div className="job_detail">
            <h1>Thông tin công việc</h1>
            <h2>
              Lĩnh vực: <span>{job.career}</span>
            </h2>
            <h2>
              Yêu cầu: <span>{job.tags.join(", ")}</span>
            </h2>
            <h2>
              Lương: <span>{job.salary}</span>
            </h2>
            <h2>
              Loại công việc: <span>{job.jobType}</span>
            </h2>
            <h2>
              Số lượng tuyển dụng: <span>{job.numOfApplicants}</span>
            </h2>
          </div>
          <div className="infor">
            <div className="box_contact">
              <ul className="contact_company">
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, paddingBottom: 1 }}
                >
                  THÔNG TIN LIÊN HỆ
                </Typography>
                <li>
                  <p>
                    Địa chỉ: <span>{job.address}</span>{" "}
                  </p>
                </li>
                <li>
                  <p>
                    Người liên hệ: <span>{job.contactName}</span>
                  </p>
                </li>
                <li>
                  <p>
                    SĐT: <span>{job.contactPhone}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Email: <span>{job.contactEmail}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {!isCompany(role, user) && (
          <div className="apply">
            <button
              onClick={handleApplyClick}
              disabled={disable}
              style={{ backgroundColor: bgcolor }}
            >
              <h6>Apply</h6>
            </button>
            <ApplyModal
              open={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        )}
      </div>
      {isCompany(role, user) && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              fontSize: "25px",
              fontFamily: "sans-serif",
              fontWeight: "600",
              textTransform: "initial",
              bgcolor: "pink",
              color: "black",
              padding: 2,
              borderRadius: "20px",
              mt: 3,
              "&:hover": { bgcolor: "pink" },
            }}
            onClick={() => {
              handleOpen();
            }}
          >
            Chọn lịch
          </Button>
        </Box>
      )}
      <Modal
        open={isOpen}
        onClose={handleCloseSCD}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Schedules
          onChangeValues={(v1, v2, v3) => {
            setSchedule([v1, v2, v3]);
            setIsOpen(false);
          }}
        />
      </Modal>
      {isCompany(role, user) && (
        <Box
          sx={{
            width: "50%",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "50px",
                color: "transparent",
                backgroundImage: "linear-gradient(to right top, pink, blue)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginTop: "20px",
              }}
            >
              DANH SÁCH ỨNG VIÊN ỨNG TUYỂN
            </h1>
          </Box>
          {!candidates?.length ? (
            <Typography
              sx={{ fontSize: 30, fontWeight: 600, color: "red", mt: 2 }}
            >
              Không có ai ứng tuyển
            </Typography>
          ) : (
            candidates.map((candidate) => {
              console.log(candidate.cv);
              return (
                <Box key={candidate.phone}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ mt: 5, flex: 2 }}>
                      <Box
                        sx={{
                          border: "1px solid green",
                          borderRadius: "10px",
                          display: "flex",
                          mb: 3,
                        }}
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
                            alt="avatar"
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
                            <span style={{ fontWeight: "300" }}>
                              {" "}
                              {candidate.tags.join(", ")}
                            </span>
                          </h1>
                          <Button
                            sx={{
                              backgroundColor: "pink",
                              color: "black",
                              fontSize: 20,
                              borderRadius: 3,
                              fontWeight: "600",
                              "&:hover": {
                                bgcolor: "pink",
                              },
                            }}
                            onClick={() =>
                              showModal(candidate.cv, candidate.fullname)
                            }
                          >
                            CV
                          </Button>
                          <Modal
                            open={isModalOpened}
                            onClose={handleClose}
                            sx={{ zIndex: 100 }}
                          >
                            <Box
                              sx={{
                                width: "100%",
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
                                {cv && (
                                  <CVModal
                                    CV={cv}
                                    fullname={fullname}
                                    onClose={handleClose}
                                  />
                                )}
                              </Box>
                            </Box>
                          </Modal>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 5, flex: 1 }}>
                      {candidate.status === "accept" ||
                      status === "accepted" ? (
                        <h1 style={{ marginLeft: "70px" }}>
                          Lịch phỏng vấn{" "}
                          <h3
                            style={{
                              fontSize: "25px",
                              fontWeight: "300",
                              marginTop: "15px",
                              color: "red",
                            }}
                          >
                            {candidate.bookSchedule
                              ? new Date(
                                  candidate.bookSchedule
                                ).toLocaleString()
                              : ""}
                          </h3>
                        </h1>
                      ) : candidate.status === "reject" ||
                        status === "rejected" ? (
                        <h2 style={{ marginLeft: "20px" }}>
                          Ứng viên không đủ điều kiện
                        </h2>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            sx={{
                              width: "100px",
                              height: "50px",
                              bgcolor: "orange",
                              color: "#000",
                              fontWeight: 600,
                              mr: 5,
                              "&:hover": {
                                bgcolor: "orange",
                              },
                            }}
                            onClick={() => handleAccept(job._id, candidate._id)}
                          >
                            Accept
                          </Button>
                          <Button
                            sx={{
                              width: "100px",
                              height: "50px",
                              bgcolor: "#666",
                              color: "pink",
                              fontWeight: 600,
                              "&:hover": {
                                bgcolor: "#666",
                              },
                            }}
                            onClick={() => {
                              handleReject(job._id, candidate._id);
                            }}
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      )}
    </React.Fragment>
  );
}
export default DetailJob;
