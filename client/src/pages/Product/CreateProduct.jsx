import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../features/product/productSlice";
import Spinner from "../../components/Spinner";
function CreateProduct(props) {
  const { isSuccess, isError, isLoading, products, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "Almonds",
    description:
      "Almonds contain lots of healthy fats, fiber, protein, magnesium, and vitamin E. The health benefits of almonds include lower blood sugar levels, reduced blood pressure, and lower cholesterol levels. They can also reduce hunger and promote weight loss.",
    price: "4000",
    category: "Dry Fruits",
  });

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //   React.useEffect(() => {
  //     if (isError) {
  //       toast.error(message);
  //     }
  //     if (isSuccess || user) {
  //       navigate("/");
  //     }
  //     dispatch(resetAuth);
  //   }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(createProduct(formData));
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Create Product
        </h1>
        <p>Please create an productp</p>
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
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              placeholder="Enter your price"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              placeholder="Enter your category"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              CreateProduct
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateProduct;
