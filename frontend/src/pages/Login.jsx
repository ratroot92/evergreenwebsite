import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";

function Login(props) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
