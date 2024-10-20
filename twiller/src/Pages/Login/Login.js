import React, { useState } from "react";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from "react-google-button";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { useUserAuth } from "../../context/UserAuthContext";

const Login = () => {
  const [email, seteamil] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();
  const { googleSignIn, logIn, signInWithPhone, verifyPhoneCode } = useUserAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      seterror(error.message);
      window.alert(error.message);
    }
  };

  const hanglegooglesignin = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      await signInWithPhone(phoneNumber);
      setIsCodeSent(true); // Show OTP input field
    } catch (error) {
      seterror(error.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await verifyPhoneCode(otp);
      navigate("/");
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img src={twitterimg} className=" image" alt="twitterimg" />
        </div>
        <div className="form-container">
          <div className="form-box">
            <TwitterIcon style={{ color: "skyblue" }} />
            <h2 className="heading">Happening now</h2>
            {error && <p>{error.message}</p>}
            <form onSubmit={handlesubmit}>
              <input
                type="email"
                className="email"
                placeholder="Email address"
                onChange={(e) => seteamil(e.target.value)}
              />
              <input
                type="password"
                className="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <div className="btn-login">
                <button type="submit" className="btn">
                  Log In
                </button>
              </div>
            </form>
            <hr />
            <div>
              <GoogleButton className="g-btn" type="light" onClick={hanglegooglesignin} />
            </div>
            <div id="recaptcha-container"></div>
            {/* Phone Authentication */}
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="tel"
                className="phone-number"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button type="submit" className="btn">
                Send OTP
              </button>
            </form>

            {isCodeSent && (
              <form onSubmit={handleVerifyCode}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit" className="btn">
                  Verify OTP
                </button>
              </form>
            )}
          </div>
          <div>
            Don't have an account?
            <Link to="/signup" style={{ textDecoration: "none", color: "var(--twitter-color)", fontWeight: "600", marginLeft: "5px" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
