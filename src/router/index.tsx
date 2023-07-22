import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import PrivateLayout from "../Layout/PrivateLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../Layout/HomePage";
import ListJob from "../pages/Job/ListJob";
import DetailJob from "../pages/Job/DetailJob";
import Profile from "../pages/Profile/Profile";
import MyJobs from "../pages/MyJob/PenddingJob";
import SuitableCandidates from "../pages/Job/SuitableCandidates";
import CreateJob from "../components/MyJob/CreateJob";
import AcceptedJob from "../pages/MyJob/AcceptedJob";
import RejectedJob from "../pages/MyJob/RejectedJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "profile", //both
            element: <Profile />,
          },

          {
            path: "job", //candidate only
            element: <ListJob />,
          },
          {
            path: "suitableCandidate",
            element: <SuitableCandidates />,
          },
          {
            path: "job/:id", //both
            element: <DetailJob />,
          },
          {
            path: "pendding", //candidate only
            element: <MyJobs />,
          },
          {
            path: "accepted", //candidate only
            element: <AcceptedJob />,
          },
          {
            path: "rejected", //candidate only
            element: <RejectedJob />,
          },
          {
            path: "createJob",
            element: <CreateJob />,
          },
        ],
      },
    ],
  },
]);
export default router;
