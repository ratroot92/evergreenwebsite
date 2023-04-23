/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  getProductById,
  resetSelectedProduct,
  updateProductDetails,
} from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";

function UploadProductDetails(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, isLoading, isError } = useSelector(
    (state) => state.products
  );
  const [productDetails, setProductDetails] = React.useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  React.useEffect(() => {
    if (_id && selectedProduct === null) {
      dispatch(getProductById(_id));
    }
    if (isError) {
      navigate("/");
    }
    if (selectedProduct) {
      setProductDetails({
        _id: selectedProduct._id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
      });
    }
  }, [_id, dispatch, isError, navigate, selectedProduct]);

  React.useEffect(() => {
    return () => dispatch(resetSelectedProduct());
  }, [dispatch]);

  function updateDetails(e) {
    e.preventDefault();
    if (_id) {
      dispatch(updateProductDetails(productDetails));
      toast.success("Success");
    } else {
      toast.error("Product id is not defined");
    }
  }

  if (isLoading || selectedProduct === null) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">Upload Details</section>

      <section className="form">
        <form onSubmit={updateDetails}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              required={true}
              _id="name"
              name="name"
              value={productDetails.name}
              placeholder="Update product name"
              onChange={(e) =>
                setProductDetails({ ...productDetails, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              required={true}
              _id="price"
              name="price"
              value={productDetails.price}
              placeholder="Update product price"
              onChange={(e) =>
                setProductDetails({ ...productDetails, price: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              className="form-control"
              required={true}
              _id="stock"
              name="stock"
              value={productDetails.stock}
              placeholder="Update product stock"
              onChange={(e) =>
                setProductDetails({ ...productDetails, stock: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              required={true}
              rows="4"
              cols="50"
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  description: e.target.value,
                })
              }
              value={productDetails.description}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Product Details
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UploadProductDetails;
