import React, { useContext } from "react";
import { GiArchiveRegister } from "react-icons/gi";
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
  const { loading, signup } = useContext(AuthContext);
  const { notification } = useContext(Notification);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  //handle submit
  const handleSubmit = (e) => {
    //prevent default form submission
    e.preventDefault();
    //create a function to call navigate

    if (loading) {
      return "Loading";
    }
    console.log(2);
    if (name === "") {
      return notification("Invalid name", "danger");
    }
    if (!emailValidator(email) || email === "") {
      return notification("Invalid email", "danger");
    }
    if (!usernameValidator(username) || username === "") {
      return notification("Invalid username", "danger");
    }
    if (!mobileValidator(mobile) || mobile === "") {
      return notification("Invalid mobile number", "danger");
    }
    if (passwordValidator(password) === false || password === "") {
      return notification("Invalid password", "danger");
    }
    if (passwordMatchValidator(password, confirmPassword) === false) {
      return notification("Password doesn't match", "danger");
    }
    const data = {
      email: email,
      username: username,
      mobile: mobile,
      password: password,
      name: name,
    };

    //clear input fields
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

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center bg-danger justify-content-center text-light">
                  <GiArchiveRegister />
                </div>
                <h3 className="text-center text-danger mb-4">
                  Haven't an account?
                </h3>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Your name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {/* username */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Username"
                      required
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  {/* email */}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="Email"
                      required
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* mobile */}
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Mobile"
                      required
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  {/* password */}
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* confirm password */}
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <button className="btn btn-danger rounded submit p-3 px-5 mt-3">
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
