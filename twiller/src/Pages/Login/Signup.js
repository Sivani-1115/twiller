// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import "./login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const { signUp, googleSignIn, signInWithPhone, verifyPhoneCode } =
    useUserAuth();
  const navigate = useNavigate();

  // Handle Email Signup
  // Handle Email Signup
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // Assuming signUp is a function that returns a promise
      await signUp(email, password);

      // Define user object to send to the backend
      const user = { username, name, email };

      // Send user data to the backend
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data); // Log the response to check the structure

      if (data.acknowledged) {
        navigate("/"); // Navigate to the home page on success
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.message);
      // Optionally remove this if you don't need both error messages and alerts
      window.alert(error.message);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      // Assuming googleSignIn is a function that handles Google auth
      await googleSignIn();
      navigate("/"); // Navigate on successful Google sign-in
    } catch (error) {
      setError(error.message); // Display error if any
      window.alert(error.message);
    }
  };

  // Handle Phone Number Submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // Assuming signInWithPhone is a function for phone number authentication
      await signInWithPhone(phoneNumber);
      setIsCodeSent(true); // Set state indicating that the OTP has been sent
      window.alert("OTP has been sent to your phone number.");
    } catch (error) {
      setError(error.message); // Display error if any
      window.alert(error.message);
    }
  };

  // Handle OTP Verification
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // Assuming verifyPhoneCode is a function to verify the OTP
      await verifyPhoneCode(otp);

      // Optionally, you can send user info to your backend here if needed

      setIsCodeSent(false); // Reset OTP sent state
      navigate("/"); // Navigate on successful verification
    } catch (error) {
      setError(error.message); // Display error if any
      window.alert(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img className="image" src={twitterimg} alt="twitterimage" />
        </div>

        <div className="form-container">
          <div className="form-box">
            <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />
            <h2 className="heading">Happening now</h2>
            <div className="heading1"> Join Twiller today</div>
            {error && <p className="errorMessage">{error}</p>}

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup}>
              <input
                className="display-name"
                type="text"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="display-name"
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="btn-login">
                <button type="submit" className="btn">
                  Sign Up with Email
                </button>
              </div>
            </form>

            <hr />

            {/* Google Signup Button */}
            <div className="google-button">
              <GoogleButton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignup}
              />
            </div>

            <hr />

            {/* Phone Number Signup Form */}
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="tel"
                className="phone-number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <button type="submit" className="btn">
                Send OTP
              </button>
            </form>

            {/* OTP Verification Form */}
            {isCodeSent && (
              <form onSubmit={handleVerifyCode}>
                <input
                  type="text"
                  className="otp-input"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit" className="btn">
                  Verify OTP
                </button>
              </form>
            )}

            {/* reCAPTCHA Container */}
            <div id="recaptcha-container"></div>

            <div>
              Already have an account?
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "var(--twitter-color)",
                  fontWeight: "600",
                  marginLeft: "5px",
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
