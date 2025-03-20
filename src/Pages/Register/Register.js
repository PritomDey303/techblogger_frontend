import React, { useContext } from "react";
import { GiArchiveRegister } from "react-icons/gi";
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
  const [date, setDate] = React.useState("");

  const handleDate = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 12;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return "Loading";
    if (!name.trim()) return notification("Invalid name", "danger");
    if (!emailValidator(email)) return notification("Invalid email", "danger");
    if (!usernameValidator(username)) return notification("Invalid username", "danger");
    if (!mobileValidator(mobile)) return notification("Invalid mobile number", "danger");
    if (!date || !handleDate(date)) return notification("You must be at least 12 years old.", "danger");
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
      setDate("");
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
              <div className="icon d-flex align-items-center bg-danger justify-content-center text-light">
                <GiArchiveRegister />
              </div>
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
                <div className="form-group">
                  <input type="date" className="form-control rounded-left" required value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control rounded-left" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control rounded-left" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <button className="btn btn-danger rounded submit p-3 px-5 mt-3">Get Started</button>
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
