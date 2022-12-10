import React from "react";
import { FaLock } from "react-icons/fa";
import "./Login.scss";
const Login = () => {
  return (
    <>
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
              <div class="login-wrap p-4 p-md-5">
                <div class="icon d-flex align-items-center bg-danger justify-content-center text-light">
                  <FaLock />
                </div>
                <h3 class="text-center text-danger mb-4">Have an account?</h3>
                <form action="#" class="login-form">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control rounded-left"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div class="form-group d-flex">
                    <input
                      type="password"
                      class="form-control rounded-left"
                      placeholder="Password"
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

export default Login;
