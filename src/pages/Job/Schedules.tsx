import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";

function Schedules({
  onChangeValues,
}: {
  onChangeValues?: (v1: string, v2: string, v3: string) => void;
}) {
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const handleSave = () => {
    if (!time1 || !time2 || !time3) return alert("Hãy chọn giờ");
    onChangeValues?.(time1, time2, time3);
  };
  return (
    <Card
      sx={{
        height: "500px",
        width: "50%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ m: 3 }}>
        <Typography sx={{ fontSize: 40, fontWeight: 600 }}>
          ĐẶT LỊCH PHỎNG VẤN
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={3}
      >
        <Box>
          <label
            htmlFor="SCD1"
            style={{
              fontSize: "25px",
              marginRight: "20px",
              fontWeight: "bold",
            }}
          >
            KHUNG GIỜ 1:
          </label>
          <input
            id="SCD1"
            type="datetime-local"
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              const date = new Date(value);
              setTime1(date.toISOString());
            }}
            style={{
              width: "400px",
              height: "50px",
              fontSize: "20px",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "50px",
              marginTop: "30px",
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={3}
      >
        <Box>
          <label
            htmlFor="SCD1"
            style={{
              fontSize: "25px",
              marginRight: "20px",
              fontWeight: "bold",
            }}
          >
            KHUNG GIO 2:
          </label>
          <input
            id="SCD1"
            type="datetime-local"
            style={{
              width: "400px",
              height: "50px",
              fontSize: "20px",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "50px",
            }}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              const date = new Date(value);
              setTime2(date.toISOString());
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={3}
      >
        <Box>
          <label
            htmlFor="SCD1"
            style={{
              fontSize: "25px",
              marginRight: "20px",
              fontWeight: "bold",
            }}
          >
            KHUNG GIO 3:
          </label>
          <input
            id="SCD1"
            type="datetime-local"
            style={{
              width: "400px",
              height: "50px",
              fontSize: "20px",
              padding: "10px",
              borderRadius: "10px",
            }}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              const date = new Date(value);
              setTime3(date.toISOString());
            }}
          />
        </Box>
      </Box>
      <Button
        sx={{
          fontSize: 25,
          bgcolor: "pink",
          color: "#000",
          fontWeight: "bolder",
          borderRadius: 3,
          width: "200px",
          mt: 4,
          "&:hover": { bgcolor: "pink" },
        }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Card>
  );
}

export default Schedules;
