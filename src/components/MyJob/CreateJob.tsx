import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../Layout/Header/Header";
import { createJob } from "../../api";
import { Job } from "../../types";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState<Job>({
    address: "",
    career: "",
    company: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    createdAt: "",
    info: "",
    jobType: "",
    name: "",
    numOfApplicants: 1,
    recruitmentTime: "",
    require: [],
    salary: 0,
    tags: [],
    updatedAt: "",
    _id: "",
  });

  const handleCreate = (e: React.MouseEvent) => {
    console.log(job);
    e.preventDefault();
    const { _id, ...rest } = job;
    createJob(rest).then(() => navigate("/profile"));
  };
  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 10,
            width: "40%",
          }}
        >
          <Box>
            <Typography variant="h5">Job Form</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Job Title"
                onChange={(e) =>
                  setJob((v) => {
                    const name = e.target.value;
                    return { ...v, name };
                  })
                }
                sx={{ marginBottom: 2, mt: 2 }}
              />
              <TextField
                label="Job Career"
                onChange={(e) =>
                  setJob((v) => {
                    const career = e.target.value;
                    return { ...v, career };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Job Skill"
                onChange={(e) =>
                  setJob((v) => {
                    const tags = e.target.value.split(", ");
                    console.log(tags);

                    return { ...v, tags };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Job Salary"
                onChange={(e) =>
                  setJob((v) => {
                    const salary = Number.parseInt(e.target.value);
                    return { ...v, salary };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Job Type"
                onChange={(e) =>
                  setJob((v) => {
                    const jobType = e.target.value;
                    return { ...v, jobType };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Job Num Of Applicants"
                onChange={(e) =>
                  setJob((v) => {
                    const numOfApplicants = Number.parseInt(e.target.value);
                    return { ...v, numOfApplicants };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Recruitment Time"
                onChange={(e) =>
                  setJob((v) => {
                    const recruitmentTime = e.target.value;
                    return { ...v, recruitmentTime };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Address"
                onChange={(e) =>
                  setJob((v) => {
                    const address = e.target.value;
                    return { ...v, address };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h5">Contact Infomation</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Job Address"
                onChange={(e) =>
                  setJob((v) => {
                    const jobAddress = e.target.value;
                    return { ...v, jobAddress };
                  })
                }
                sx={{ marginBottom: 2, mt: 2 }}
              />
              <TextField
                label="Job Contact Name"
                onChange={(e) =>
                  setJob((v) => {
                    const contactName = e.target.value;
                    return { ...v, contactName };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Job Contact Phone"
                onChange={(e) =>
                  setJob((v) => {
                    const contactPhone = e.target.value;
                    return { ...v, contactPhone };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
              <TextField
                type="email"
                label="Job Contact Email"
                onChange={(e) =>
                  setJob((v) => {
                    const contactEmail = e.target.value;
                    return { ...v, contactEmail };
                  })
                }
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "center",
              bgcolor: "pink",
              fontSize: "20px",
              mb: 2,
            }}
            onClick={handleCreate}
          >
            Create Job
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default CreateJob;
