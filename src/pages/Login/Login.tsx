import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { AxiosError, login as loginAPI } from "../../api";
import { useAuth } from "../../components/Auth";
import { useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { action, login, isLoading } = useAuth();
  useEffect(() => {
    if (login) {
      if (isChecked) {
        navigate("/profile/company");
        return;
      }
      navigate("/");
    }
  }, [login]);
  if (login || isLoading) return <></>;
  const handleLogin = async () => {
    try {
      const data = await loginAPI(
        email,
        password,
        !isChecked ? "candidate" : "company"
      );
      action.login(data);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <React.Fragment>
      <div className="login__page">
        <div className="login__container">
          <div className="login__logo">
            <h1>Login</h1>
          </div>
          <div className="login__field">
            <label
              className="label"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              className="input"
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              className="label"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="check">
              <input
                id="checkbox"
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ width: 18, aspectRatio: 1 }}
              />
              <label
                htmlFor="checkbox"
                style={{
                  fontSize: "20px",
                  marginLeft: "10px",
                }}
              >
                You log in as a company?
              </label>
            </div>
          </div>
          <div className="options">
            <div className="forgot__password">
              Forgot password?
              <Link to="/forgot-password">Click here</Link>
            </div>
            <div className="register__user">
              New user?
              <Link to="/register">Signup here</Link>
            </div>
          </div>
          <div className="login__button">
            <button onClick={handleLogin}>
              <h1>Login</h1>
            </button>
          </div>
          <div className="login__social">
            <div className="login__social__text">Or Login with</div>
            <div className="login__social__icons">
              <div className="login__social__icon">
                <FacebookIcon sx={{ color: "#385898", fontSize: "40px" }} />
                <GoogleIcon sx={{ color: "red", fontSize: "40px" }} />
                <TwitterIcon sx={{ color: "#00b6f1", fontSize: "40px" }} />
              </div>
            </div>
            <div className="others"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
