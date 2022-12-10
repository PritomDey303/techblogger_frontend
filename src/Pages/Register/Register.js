import React from "react";
import { GiArchiveRegister } from "react-icons/gi";
import "./Register.scss";
const Register = () => {
  return (
    <>
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
              <div class="login-wrap p-4 p-md-5">
                <div class="icon d-flex align-items-center bg-danger justify-content-center text-light">
                  <GiArchiveRegister />
                </div>
                <h3 class="text-center text-danger mb-4">
                  Haven't an account?
                </h3>
                <form action="#" class="login-form">
                  {/* username */}
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control rounded-left"
                      placeholder="Username"
                      required
                    />
                  </div>
                  {/* email */}
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control rounded-left"
                      placeholder="Email"
                      required
                    />
                  </div>
                  {/* mobile */}
                  <div class="form-group d-flex">
                    <input
                      type="text"
                      class="form-control rounded-left"
                      placeholder="Mobile"
                      required
                    />
                  </div>

                  {/* password */}
                  <div class="form-group d-flex">
                    <input
                      type="password"
                      class="form-control rounded-left"
                      placeholder="Password"
                      required
                    />
                  </div>
                  {/* confirm password */}
                  <div class="form-group d-flex">
                    <input
                      type="password"
                      class="form-control rounded-left"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  <div class="form-group mt-2">
                    <button
                      type="submit"
                      class="btn btn-danger rounded submit p-3 px-5 mt-3"
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
