import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";

function Register(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function registerUser(e) {
    e.preventDefault();
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Regsiter
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={registerUser}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Enter your confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
