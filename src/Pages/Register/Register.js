import React, { useContext } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Notification } from "../../Context/ToastContext";
import {
  emailValidator,
  mobileValidator,
  passwordMatchValidator,
  passwordValidator,
  usernameValidator,
} from "../../UtilityFunction/useInputValidator";
import { motion } from "framer-motion";
import "./Register.scss";

const Register = () => {
  const { loading, signup, isSignup, setIsSignup, authData } = useContext(AuthContext);
  const { notification } = useContext(Notification);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;
    if (!name.trim()) return notification("Invalid name", "danger");
    if (!emailValidator(email)) return notification("Invalid email", "danger");
    if (!usernameValidator(username)) return notification("Invalid username", "danger");
    if (!mobileValidator(mobile)) return notification("Invalid mobile number", "danger");
    if (!passwordValidator(password)) return notification("Invalid password", "danger");
    if (!passwordMatchValidator(password, confirmPassword)) return notification("Passwords do not match", "danger");

    const data = { email, username, mobile, password, name };

    const clearInput = () => {
      setName("");
      setEmail("");
      setUsername("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
    };

    signup(data, clearInput);
  };

  if (isSignup) {
    setIsSignup(false);
    return <Navigate to="/login" />;
  }

  if (authData.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="icon d-flex align-items-center bg-danger justify-content-center text-light">
                <GiArchiveRegister />
              </motion.div>
              <h3 className="text-center text-danger mb-4">Haven't an account?</h3>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <input type="text" className="form-control rounded-left" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control rounded-left" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control rounded-left" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control rounded-left" placeholder="Mobile" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div className="form-group position-relative">
                  <input type={showPassword ? "text" : "password"} className="form-control rounded-left pr-5" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div className="eye-icon" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                <div className="form-group position-relative">
                  <input type={showConfirmPassword ? "text" : "password"} className="form-control rounded-left pr-5" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <div className="eye-icon" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                <div className="form-group mt-2">
                  <motion.button
                    className="btn btn-danger rounded submit p-3 px-5 mt-3"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? <motion.div className="loader" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}></motion.div> : "Get Started"}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
