import React from "react";
import { GiArchiveRegister } from "react-icons/gi";
import "./Register.scss";
const Register = () => {
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
                <form action="#" className="login-form">
                  {/* username */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Username"
                      required
                    />
                  </div>
                  {/* email */}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="Email"
                      required
                    />
                  </div>
                  {/* mobile */}
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Mobile"
                      required
                    />
                  </div>

                  {/* password */}
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      required
                    />
                  </div>
                  {/* confirm password */}
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Confirm Password"
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

export default Register;
