import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser, resetAuth } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { isSuccess, isError, isLoading, user, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "maliksblr92@gmail.com",
    password: "pakistan123>",
  });
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess || user) {
    //   navigate("/");
    // }
    dispatch(resetAuth);
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData));
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
              type="email"
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
              type="password"
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
