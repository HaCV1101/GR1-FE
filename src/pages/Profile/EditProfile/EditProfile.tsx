import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import { useEffect, useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { updateCV } from "../../../api";
import { isCompany, useAuth } from "../../../components/Auth";
import SelectInput from "../SelectInput/SelectInput";
import { Input, Space } from "antd";
import { CVType } from "../../../types";

type SkillOptType = {
  label: string;
  value: string;
};
function EditProfile({
  cv,
  onClose,
  onChangeCV,
}: {
  onClose: Function;
  cv: CVType;
  onChangeCV: (cv: CVType) => void;
}) {
  const { role, user, action } = useAuth();
  if (!user || isCompany(role, user)) return null;
  const [USER, setUSER] = useState(user);
  const [CV, setCV] = useState<CVType>(cv);
  const [itSkillopts, setItSkillopts] = useState<SkillOptType[]>([]);
  const [skills, setSkills] = useState<any>();
  const [hobbiesopts, setHobbiesopts] = useState<SkillOptType[]>([]);
  const [hobbies, setHobbies] = useState<any>();
  useEffect(() => {
    const skills = CV.skills[0].details.map((v) => {
      return { label: v, value: v };
    });
    const hobbies = CV.hobbies.map((v) => {
      return { label: v, value: v };
    });
    setItSkillopts(skills);
    setSkills(skills.map((v) => [v.value]));
    setHobbiesopts(hobbies);
    setHobbies(hobbies.map((v) => [v.value]));
    onChangeCV(CV);
  }, [CV]);
  useEffect(() => {
    if (!skills) return;
    const r = skills.map((v: string[]) => v[0]);
    CV.skills[0].details = r;
  }, [skills]);
  useEffect(() => {
    if (!hobbies) return;
    const r = hobbies.map((v: string[]) => v[0]);
    CV.hobbies = r;
  }, [hobbies]);
  useEffect(() => {
    setUSER(user);
  }, [user]);

  const handleClose = () => {
    onClose();
  };
  const handleSave = async () => {
    const stateSave = await updateCV(CV);
    action.login({ ...USER, cv: stateSave });
    setTimeout(() => {
      handleClose();
    }, 100);
  };

  return (
    <Card
      sx={{
        background: "#fff",
        width: "100%",
        minHeight: "500px",
        overflowY: "scroll",
        padding: 1,
        borderRadius: "30px",
      }}
    >
      <Box
        sx={{
          padding: 2,
          borderBottom: "#dedcdc 1px solid",
          display: "flex",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
        >
          Edit Profile
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            background: "#e3e5ea",
            "&:hover": { backgroundColor: "#D8DADF" },
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <Box p={2}>
        {/* avatar */}
        <Box
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            variant="h6"
            fontWeight={900}
          >
            Avatar
          </Typography>
          <Button
            sx={{
              textTransform: "initial",
              position: "absolute",
              top: 0,
              right: 12,
              "&:hover": { backgroundColor: "#e7eaeb" },
            }}
          >
            <label
              htmlFor="avatar_input"
              style={{ color: "green", fontSize: 18 }}
            >
              Edit
            </label>
            <input
              id="avatar_input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const img = e.target.files?.[0];
                if (!img) return;
                const reader = new FileReader();
                reader.onload = (v) => {
                  let result = v.target?.result?.toString() || CV.avatar;
                  setCV((e) => {
                    return { ...e, avatar: result };
                  });
                };
                reader.readAsDataURL(img);
              }}
            />
          </Button>
          <Avatar
            sx={{
              width: "170px",
              height: "170px",
              outline: "solid 1px #aaa",
              alignSelf: "center",
              m: 2,
            }}
            alt={`${user?.fullname}`}
            src={CV.avatar}
          ></Avatar>
        </Box>
        {/* fullname */}
        <Box
          display="flex"
          flexDirection="column"
          width={"100%"}
          margin={"auto"}
        >
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            Fullname
          </Typography>
          <Box
            position={"relative"}
            display={"flex"}
            alignItems="center"
          >
            <PermIdentityIcon sx={{ margin: "15px" }} />
            <input
              value={USER?.fullname}
              style={{
                width: "100%",
                padding: "5px",
                fontSize: 20,
                borderRadius: "10px",
              }}
              placeholder="Nhập tên đầy đủ của bạn"
              onChange={(e) => {
                setUSER((v) => {
                  const fullname = e.target.value;
                  return { ...v, fullname };
                });
              }}
            />
          </Box>
        </Box>
        {/* apply position */}
        <Box
          display="flex"
          flexDirection="column"
          width={"100%"}
          margin={"auto"}
        >
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            Apply position
          </Typography>
          <Box
            position={"relative"}
            display={"flex"}
            alignItems="center"
          >
            <PermIdentityIcon sx={{ margin: "15px" }} />
            <input
              value={CV.applyPosition}
              style={{
                width: "100%",
                padding: "5px",
                fontSize: 20,
                borderRadius: "10px",
              }}
              placeholder="Nhập vị trí ứng tuyển"
              onChange={(e) => {
                setCV((v) => {
                  const applyPosition = e.target.value;
                  return { ...v, applyPosition };
                });
              }}
            />
          </Box>
        </Box>
        {/* contact */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
        >
          <Typography
            variant="h6"
            fontWeight={900}
          >
            Contact
          </Typography>
          <Box
            position={"relative"}
            display={"flex"}
            alignItems="center"
          >
            <CakeIcon sx={{ margin: "15px" }} />
            <input
              value={CV.contacts.birthday}
              style={{
                width: "100%",
                padding: "5px",
                fontSize: 20,
                borderRadius: "10px",
              }}
              placeholder="Nhập ngày sinh của bạn"
              onChange={(e) => {
                setCV((v) => {
                  const birthday = e.target.value;
                  v.contacts.birthday = birthday;
                  // return Object.assign({}, v);
                  return { ...v };
                });
              }}
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
            >
              <PermIdentityIcon sx={{ margin: "15px" }} />{" "}
              <input
                value={CV.contacts.gender}
                style={{
                  width: "100%",
                  padding: "5px",
                  fontSize: 20,
                  borderRadius: "10px",
                }}
                placeholder="Nhập giới tính của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const gender = e.target.value;
                    v.contacts.gender = gender;
                    return { ...v };
                  });
                }}
              />
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
            >
              <FmdGoodIcon sx={{ margin: "15px" }} />
              <input
                value={CV.contacts.address}
                style={{
                  width: "100%",
                  padding: "5px",
                  fontSize: 20,
                  borderRadius: "10px",
                }}
                placeholder="Nhập địa chỉ của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const address = e.target.value;
                    v.contacts.address = address;
                    return { ...v };
                  });
                }}
              />
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
            >
              <PhoneIcon sx={{ margin: "15px" }} />
              <input
                value={CV.contacts.phone}
                style={{
                  width: "100%",
                  padding: "5px",
                  fontSize: 20,
                  borderRadius: "10px",
                }}
                placeholder="Nhập số điện thoại của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const phone = e.target.value;
                    v.contacts.phone = phone;
                    return { ...v };
                  });
                }}
              />
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
            >
              <MailOutlineIcon sx={{ margin: "15px" }} />
              <input
                value={CV.contacts.mail}
                style={{
                  width: "100%",
                  padding: "5px",
                  fontSize: 20,
                  borderRadius: "10px",
                }}
                placeholder="Nhập email của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const mail = e.target.value;
                    v.contacts.mail = mail;
                    return { ...v };
                  });
                }}
              />
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
            >
              <GitHubIcon sx={{ margin: "15px" }} />
              <input
                value={CV.contacts.github}
                style={{
                  width: "100%",
                  padding: "5px",
                  fontSize: 20,
                  borderRadius: "10px",
                }}
                placeholder="Nhập github của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const github = e.target.value;
                    v.contacts.github = github;
                    return { ...v };
                  });
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Carreer */}
        <Box
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            Career goals
          </Typography>
          <textarea
            style={{
              width: "98%",
              minHeight: "120px",
              alignSelf: "center",
              padding: "15px 15px",
              fontSize: "20px",
              marginTop: "10px",
              marginLeft: "20px",
              borderRadius: "10px",
            }}
            value={CV.goals}
            placeholder="Nhập mục tiêu công việc của bạn"
            onChange={(e) => {
              setCV((v) => {
                const goals = e.target.value;
                v.goals = goals;
                return { ...v, goals };
              });
            }}
          />
        </Box>
        {/* Education */}
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            Educations
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            width={"100%"}
            margin={"auto"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              margin={"15px 0"}
            >
              <label
                htmlFor="university"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  width: 130,
                  fontFamily: "serif",
                  marginRight: 10,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                University:
              </label>
              <input
                id="university"
                value={CV.education[0].university}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập trường đại học của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const university = e.target.value;
                    v.education[0].university = university;
                    return { ...v, university };
                  });
                }}
              />
            </Box>
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              marginBottom={"15px"}
            >
              <label
                htmlFor="specialized"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  fontFamily: "serif",
                  marginRight: 10,
                  width: 130,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Specialized:
              </label>
              <input
                id="specialized"
                value={CV.education[0].specialized}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập chuyên ngành của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const specialized = e.target.value;
                    v.education[0].specialized = specialized;
                    return { ...v, specialized };
                  });
                }}
              />
            </Box>
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              marginBottom={"15px"}
            >
              <label
                htmlFor="graduationType"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  fontFamily: "serif",
                  marginRight: 10,
                  width: 130,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Graduation Type:
              </label>
              <input
                id="graduationType"
                value={CV.education[0].graduationType}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập loại tốt nghiệp của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const graduationType = e.target.value;
                    v.education[0].graduationType = graduationType;
                    return { ...v, graduationType };
                  });
                }}
              />
            </Box>
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              marginBottom={"15px"}
            >
              <label
                htmlFor="period"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  fontFamily: "serif",
                  marginRight: 10,
                  width: 130,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Period
              </label>
              <input
                id="period"
                value={CV.education[0].period}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập thời gian học tại trường của bạn"
                onChange={(e) => {
                  setCV((v) => {
                    const period = e.target.value;
                    v.education[0].period = period;
                    return { ...v, period };
                  });
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Skill */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            mb={1}
          >
            Skills
          </Typography>
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", marginBottom: 15 }}
          >
            <Space.Compact
              style={{ width: "100%", borderColor: "#000", borderWidth: 2 }}
              size="middle"
            >
              <Input
                style={{
                  width: "10%",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderColor: "#000",
                  borderWidth: 2,
                }}
                disabled
                value={CV.skills[0].title}
              />
              <SelectInput
                options={itSkillopts}
                style={{ width: "90%", borderColor: "#000" }}
                onChange={(v) => {
                  console.table(v);
                  setSkills(v);
                }}
                onSearch={(v) => {
                  if (!v) return;
                  setItSkillopts([{ value: v, label: v }]);
                }}
                value={skills}
              />
            </Space.Compact>
          </Space>
        </Box>
        {/* Experience */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            Experiences
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            width={"100%"}
            margin={"auto"}
          >
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              margin={"15px 0"}
            >
              <label
                htmlFor="position"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  width: 130,
                  fontFamily: "serif",
                  marginRight: 10,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Position:
              </label>
              <input
                id="position"
                value={CV.experiences[0].position}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập vị trí công việc bạn từng làm"
                onChange={(e) => {
                  setCV((v) => {
                    const position = e.target.value;
                    v.experiences[0].position = position;
                    return { ...v, position };
                  });
                }}
              />
            </Box>
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              marginBottom={"15px"}
            >
              <label
                htmlFor="company"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  fontFamily: "serif",
                  marginRight: 10,
                  width: 130,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Company:
              </label>
              <input
                id="company"
                value={CV.experiences[0].company}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập tên công ty bạn đã từng làm"
                onChange={(e) => {
                  setCV((v) => {
                    const company = e.target.value;
                    v.experiences[0].company = company;
                    return { ...v, company };
                  });
                }}
              />
            </Box>
            <Box
              position={"relative"}
              display={"flex"}
              alignItems="center"
              marginBottom={"15px"}
            >
              <label
                htmlFor="_period"
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  fontFamily: "serif",
                  marginRight: 10,
                  width: 130,
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Period:
              </label>
              <input
                id="_period"
                value={CV.experiences[0].period}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: 20,
                }}
                placeholder="Nhập thời gian bạn đã làm tại công ty"
                onChange={(e) => {
                  setCV((v) => {
                    const period = e.target.value;
                    v.experiences[0].period = period;
                    return { ...v, period };
                  });
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Hobbies */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            Hobbies
          </Typography>
        </Box>
        <SelectInput
          options={hobbiesopts}
          style={{ width: "90%", borderColor: "#000" }}
          onChange={(v) => {
            console.table(v);
            setHobbies(v);
          }}
          onSearch={(v) => {
            if (!v) return;
            setHobbiesopts([{ value: v, label: v }]);
          }}
          value={hobbies}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderColor: "#666",
          borderWidth: 2,
          borderStyle: "solid",
          width: "15%",
          margin: "auto",
          borderRadius: 20,
          backgroundColor: "pink",
        }}
      >
        <Button
          style={{ fontSize: 20, fontWeight: 900, color: "black" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Card>
  );
}

export default EditProfile;
