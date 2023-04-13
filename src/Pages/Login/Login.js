import React from "react";
import { FaLock } from "react-icons/fa";
import "./Login.scss";
const Login = () => {
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
                <form action="#" className="login-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      required
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
