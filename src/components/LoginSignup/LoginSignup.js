import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../Action/firebase";
import { setUser } from '../Action/UserAction';
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import "../LoginSignup/LoginSignup.css";
import google from "../Assets/Google.png"

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false); // Define the states here
  const { loading, error } = useSelector((state) => state.auth);

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (action === "Sign Up" && !username) {
      validationErrors.username = "User Name is required";
    } else if (action === "Sign Up" && !validateUsername(username)) {
      validationErrors.username =
        "Username must be 3-16 characters and can contain letters, numbers, underscores, and hyphens.";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Email address is invalid";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 6 characters long, and include at least one letter and one number.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let userCredential;
        if (action === "Sign Up") {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Use UID as the document ID
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: username,
            email: email,
            createdAt: new Date(),
          });

          console.log("User created and data added to Firestore successfully!");
        } else {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User data:", userData);
            dispatch(setUser({ ...user, ...userData }));
          }
        }
        navigate("/home");
      } catch (error) {
        console.error("Error during authentication:", error.message);
      }
    }
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateEmail(resetEmail)) {
      setErrors({ resetEmail: "Email address is invalid" });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setShowResetForm(false);
    } catch (error) {
      setErrors({ resetEmail: error.message });
    }
  };


  const toggleAction = () => {
    setAction((prevAction) => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
    setErrors({});
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });
      }

      dispatch(setUser({ ...user, ...userDoc.data() }));
      navigate("/home");
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

 
  return (
    <div className="login_bg">
      <div className="contain">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {showResetForm ? (
            <>
              <div className="input">
                <img src={email_icon} alt="Email Icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              {errors.resetEmail && <span className="error">{errors.resetEmail}</span>}
              <div className="submit-contain">
                <button className="submit" onClick={handlePasswordReset}>
                  Send Reset Email
                </button>
                <div className="toggle-action" onClick={() => setShowResetForm(false)}>
                  Back to {action}
                </div>
              </div>
            </>
          ) : (
            <>
              {action === "Login" ? null : (
                <div className="input">
                  <img src={user_icon} alt="User Icon" />
                  <input
                    type="text"
                    placeholder="User Name"
                    value={username}
                    id="validationdefault01"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}
              {errors.username && <span className="error">{errors.username}</span>}
              <div className="input">
                <img src={email_icon} alt="Email Icon" />
                <input
                  type="email"
                  placeholder="Email-id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
              <div className="input">
                <img src={password_icon} alt="Password Icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
              <div className="password-remember-container">
                <div className="forgot-password" onClick={() => setShowResetForm(true)}>
                  <span>Lost password?</span>
                </div>
                <div className="remember-me">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="submit-contain">
                <button className="submit" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Processing..." : action === "Sign Up" ? "Sign Up" : "Login"}
                </button>
                <div className="toggle-action" onClick={toggleAction}>
                  {action === "Sign Up" ? "Login" : "Sign Up"}
                </div>
              </div>
              {error && <span className="error">{error}</span>}
            </>
          )}
        </div>
        <button className="google" onClick={handleGoogleLogin}>
<img src={google} alt="Google Icon" className="google-icon" />
</button>
      </div>
    </div>
  );
};

export default LoginSignup;
