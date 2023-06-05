import React, { useContext } from "react";
import { FaLock } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Notification } from "../../Context/ToastContext";
import { checkStringType } from "../../UtilityFunction/useInputValidator";
import "./Login.scss";
const Login = () => {
  const { loading, login, authData } = useContext(AuthContext);

  const [string, setString] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { notification } = useContext(Notification);
  // send user to home page if already logged in
  if (authData.isLoggedIn) {
    return <Navigate to="/" />;
  }
  //handle submit
  const handleSubmit = (e) => {
    let data = {};
    //prevent default form submission
    e.preventDefault();
    if (loading) {
      return "Loading";
    }
    if (checkStringType(string) === "email") {
      data = {
        email: string,
        password: password,
        mobile: "",
        username: "",
      };
    } else if (checkStringType(string) === "mobile") {
      data = {
        email: "",
        password: password,
        mobile: string,
        username: "",
      };
    } else if (checkStringType(string) === "username") {
      data = {
        email: "",
        password: password,
        mobile: "",
        username: string,
      };
    } else {
      return notification("Invalid Input", "danger");
    }
    if (password.trim() === "") {
      return notification("Invalid password", "danger");
    }

    //clear input fields
    const clearInput = () => {
      setString("");
      setPassword("");
    };
    //login function call
    login(data, clearInput);
  };

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center bg-danger justify-content-center text-light">
                  <FaLock />
                </div>
                <h3 className="text-center text-danger mb-4">
                  Have an account?
                </h3>
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

                  <div className="form-group mt-2">
                    <button
                      type="submit"
                      className="btn btn-danger rounded submit p-3 px-5 mt-3"
                    >
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

export default Login;
