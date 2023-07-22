import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { storeItem } from "../utils";
import { CVType, User } from "../types";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});
const onRequest = (config: InternalAxiosRequestConfig) => {
  config.headers.set("Content-Type", "application/json");
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
};
const onResponse = (response: AxiosResponse) => {
  const token = response.data?.data?.token;
  if (token) {
    localStorage.setItem("token", token);
  }
  return response;
};
axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse);

const login = async (
  email: string,
  password: string,
  role: "candidate" | "company"
) => {
  const response = await axiosInstance.post(`/auth/${role}/login`, {
    email,
    password,
  });
  storeItem("role", role);
  if (role === "candidate") {
    response.data.data.user.role = "candidate";
    return response.data.data.user;
  } else {
    response.data.data.company.role = "company";
    return response.data.data.company;
  }
};
const signup = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  role: "candidate" | "company"
) => {
  const response = await axiosInstance.post(`/auth/${role}/signup`, {
    [role === "company" ? "name" : "fullname"]: name,
    email,
    phone,
    password,
    confirmPassword,
  });
  return response.data.data.user;
};

const getProfile = async (role: "candidate" | "company") => {
  const res = await axiosInstance.get(`/${role}`);
  const data = res.data;
  const fieldName = role === "company" ? "company" : "user";
  data.data[fieldName].role = role;
  return data.data[fieldName];
};

const getCV = async () => {
  const res = await axiosInstance.get("/candidate/cv");
  const data = res.data;
  return data.data.cv;
};

const getSuitableJobs = async () => {
  const res = await axiosInstance.get("/job/suitableJobs");
  const data = res.data;
  return data.data.companyJobs;
};

const updateCV = async (payload: any) => {
  const res = await axiosInstance.put("/candidate/cv", payload);
  return res.data.data.cv;
};
const getJob = async (id: string) => {
  const res = await axiosInstance.get(`/job/${id}`);
  const data = res.data;
  return data.data;
};

const getListJob = async () => {
  const res = await axiosInstance.get("company/job");
  const data = res.data;
  // console.log(data.data);

  return data.data.jobs;
};

const getSuitableCandidates = async (jobId: string) => {
  const res = await axiosInstance.get(`job/${jobId}/suitableCandidates`);
  const data = res.data;
  return data.data.candidates;
};

const createJob = async (payload: any) => {
  const res = await axiosInstance.post("job", payload);
  const data = res.data;
  console.log(data.data);

  return data.data.job;
};

const sendApply = async (jobId: string) => {
  try {
    const res = await axiosInstance.post(`job/${jobId}/apply`);
    const data = res.data;
    return data.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw error.response?.data.type as string;
    }
  }
};

const getCandidates = async (jobId: string) => {
  const res = await axiosInstance.get(`job/${jobId}/getCandidates`);
  const data = res.data;
  return data.candidates as (Omit<User, "cv"> & {
    cv: CVType;
    status: "pending" | "accept" | "reject";
  })[];
};

const rejectCandidate = async (jobId: string, userId: string) => {
  console.log(jobId, userId);
  const res = await axiosInstance.post("job/rejectCandidate", {
    jobId: jobId,
    userId: userId,
  });
  const data = res.data;
  console.log(data);

  return data;
};

const acceptCandidate = async (jobId: string, userId: string) => {
  const res = await axiosInstance.post("job/acceptCandidate", {
    jobId,
    userId,
  });
  const data = res.data;
  return data;
};
const getJobRejected = async () => {
  const res = await axiosInstance.get("/candidate/getJobRejected");
  const data = res.data;
  return data.getJobRejected;
};

const getJobPendding = async () => {
  const res = await axiosInstance.get("/candidate/getJobPendding");
  const data = res.data;
  return data.jobPenddings;
};

const getJobAccepted = async () => {
  const res = await axiosInstance.get("/candidate/getJobAccepted");
  const data = res.data;
  return data.getJobAccepted;
};

const bookSchedule = async (
  jobId: string,
  userId: string,
  schedule: string
) => {
  const res = await axiosInstance.post("/job/bookSchedule", {
    jobId,
    userId,
    schedule,
  });
  const data = res.data;
  return data.data;
};
const setSchedules = async (
  jobId: string,
  userId: string,
  schedules: string[]
) => {
  const res = await axiosInstance.post("/job/setSchedules", {
    jobId,
    userId,
    schedules,
  });
  const data = res.data;
  return data.data;
};
export {
  getSuitableJobs,
  getCV,
  getProfile,
  signup,
  login,
  axiosInstance,
  AxiosError,
  updateCV,
  getJob,
  getListJob,
  getSuitableCandidates,
  createJob,
  sendApply,
  getCandidates,
  rejectCandidate,
  acceptCandidate,
  getJobPendding,
  getJobAccepted,
  getJobRejected,
  bookSchedule,
  setSchedules,
};
