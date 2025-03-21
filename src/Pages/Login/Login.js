import React, { useContext } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Notification } from "../../Context/ToastContext";
import { checkStringType } from "../../UtilityFunction/useInputValidator";
import "./Login.scss";

const Login = () => {
  const { loading, login, authData } = useContext(AuthContext);

  const [string, setString] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const { notification } = useContext(Notification);

  if (authData.isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    let data = {};
    e.preventDefault();

    if (loading) return;

    if (checkStringType(string) === "email") {
      data = { email: string, password, mobile: "", username: "" };
    } else if (checkStringType(Number(string)) === "mobile") {
      data = { email: "", password, mobile: string, username: "" };
    } else if (checkStringType(string) === "username") {
      data = { email: "", password, mobile: "", username: string };
    } else {
      return notification("Invalid Input", "danger");
    }

    if (!password.trim()) {
      return notification("Invalid password", "danger");
    }

    const clearInput = () => {
      setString("");
      setPassword("");
    };

    login(data, clearInput, rememberMe);
  };

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
                className="icon d-flex align-items-center bg-danger justify-content-center text-light"
              >
                <FaLock />
              </motion.div>
              <h3 className="text-center text-danger mb-4">Have an account?</h3>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="Enter your email or mobile or username"
                    required
                    name="string"
                    value={string}
                    onChange={(e) => setString(e.target.value)}
                  />
                </div>
                <div className="form-group position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-left pr-5"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="eye-icon"
                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label>Remember me</label>
                </div>
                <div className="form-group mt-2">
                  <motion.button
                    type="submit"
                    className="btn btn-danger rounded submit p-3 px-5 mt-3"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? (
                      <motion.div
                        className="loader"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      ></motion.div>
                    ) : (
                      "Get Started"
                    )}
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

export default Login;
