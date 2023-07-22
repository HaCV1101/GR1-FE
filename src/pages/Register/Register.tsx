import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError, signup as signupAPI } from "../../api";
import "./Register.scss";
import { useAuth } from "../../components/Auth";
function Register() {
  const navigate = useNavigate();
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const tab1Ref = useRef<HTMLDivElement>(null);
  // const tab2Ref = useRef<HTMLDivElement>(null);

  const [companyVisiable, setCompanyVisiable] = useState(false);
  const [buttonColor, setButtonColor] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { action, login } = useAuth();

  useEffect(() => {
    if (login) {
      if (companyVisiable === true) {
        navigate("/profile/company");
        return;
      }
      navigate("/");
    }
  }, [login]);

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password not same!!");
        return;
      }
      const data = await signupAPI(
        fullname,
        email,
        phone,
        password,
        confirmPassword,
        !companyVisiable ? "candidate" : "company"
      );
      action.login(data);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }

    console.log(fullname, email, phone, password, confirmPassword);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <React.Fragment>
      <div className="signup__page">
        <div className="signup__container">
          <div className="signup__logo">
            <h1>Signup</h1>
          </div>
          <div className="roles">
            <button
              className={`button_candidate ${buttonColor ? "" : "set-color"}`}
              onClick={() => {
                setCompanyVisiable(false), setButtonColor(false);
              }}
            >
              CANDIDATE
            </button>
            <button
              className={`button_company ${!buttonColor ? "" : "set-color"}`}
              onClick={() => {
                setCompanyVisiable(true), setButtonColor(true);
              }}
            >
              COMPANY
            </button>
          </div>
          <div
            // ref={tab1Ref}
            className={`candidate ${!companyVisiable ? "" : "d-none"}`}
          >
            <div className="signup__field">
              <label
                className="label"
                htmlFor="fullname"
              >
                Full name
              </label>
              <input
                id="fullname"
                className="input"
                type="text"
                placeholder="Nguyen Van A"
                value={fullname}
                onChange={changeFullname}
              />
              <label
                className="label"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="abc123@abc.xy"
                value={email}
                onChange={changeEmail}
              />

              <label
                className="label"
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                id="phone"
                className="input"
                type="text"
                placeholder="0123456789"
                value={phone}
                onChange={changePhone}
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
                placeholder="********"
                value={password}
                onChange={changePassword}
              />

              <label
                className="label"
                htmlFor="confirm pass"
              >
                Confirm password
              </label>
              <input
                id="confirm pass"
                className="input"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={changeConfirmPassword}
              />
            </div>
            <div className="check">
              <input
                id="checkboxs"
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ width: 25, aspectRatio: 1 }}
              />
              <label
                htmlFor="checkboxs"
                style={{ fontSize: "20px", marginLeft: 10 }}
              >
                I have read and agree to the Terms of Use and Privacy Policy of
                the recruitment website
              </label>
            </div>
          </div>
          <div
            // ref={tab2Ref}
            className={`company ${companyVisiable ? "" : "d-none"}`}
          >
            <div className="signup__field">
              <label className="label">Company name</label>
              <input
                className="input"
                type="text"
                placeholder="Nguyen Van A"
                value={fullname}
                onChange={changeFullname}
              />
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                placeholder="abc123@abc.xy"
                value={email}
                onChange={changeEmail}
              />

              <label className="label">Hotline</label>
              <input
                className="input"
                type="text"
                placeholder="0123456789"
                value={phone}
                onChange={changePhone}
              />
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                placeholder="********"
                value={password}
                onChange={changePassword}
              />
              <label className="label">Confirm password</label>
              <input
                className="input"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={changeConfirmPassword}
              />
            </div>
            <div className="check">
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              I have read and agree to the Terms of Use and Privacy Policy of
              the recruitment website
            </div>
          </div>
          <div className="signup__button">
            <button
              onClick={
                isChecked
                  ? handleSignup
                  : () => {
                      alert("You must check!!!");
                    }
              }
            >
              <h1>Signup</h1>
            </button>
          </div>
          <div className="option">
            Did you have an account?
            <Link to="/">Login here</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
