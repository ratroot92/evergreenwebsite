import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { createCategory } from "../../features/category/categorySlice";
function CreateCategory(props) {
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: "Almonds",
    description:
      "Almonds contain lots of healthy fats, fiber, protein, magnesium, and vitamin E. The health benefits of almonds include lower blood sugar levels, reduced blood pressure, and lower cholesterol levels. They can also reduce hunger and promote weight loss.",
  });

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(createCategory(formData));
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Create Category
        </h1>
        <p>Please create an Categoryp</p>
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
              placeholder="Enter your first name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              placeholder="Enter your last name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              CreateCategory
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateCategory;
