/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import {
  getCategoryById,
  resetCategories,
  updateCategoryDetails,
} from "../../../features/category/categorySlice";

function UploadCategoryDetails(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCategory, isLoading, isError } = useSelector(
    (state) => state.categories
  );
  const [CategoryDetails, setCategoryDetails] = React.useState({
    name: "",
    description: "",
  });

  React.useEffect(() => {
    if (_id && !selectedCategory) {
      dispatch(getCategoryById(_id));
    }
    if (isError) {
      navigate("/");
    }
    if (selectedCategory) {
      setCategoryDetails({
        _id: selectedCategory._id,
        name: selectedCategory.name,
        description: selectedCategory.description,
      });
    }
  }, [_id, dispatch, isError, navigate, selectedCategory]);

  React.useEffect(() => {
    return () => dispatch(resetCategories());
  }, [dispatch]);

  function updateDetails(e) {
    e.preventDefault();
    if (_id) {
      dispatch(updateCategoryDetails(CategoryDetails));
      toast.success("Success");
    } else {
      toast.error("Category id is not defined");
    }
  }

  if (isLoading || !selectedCategory) {
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
              value={CategoryDetails.name}
              placeholder="Update Category name"
              onChange={(e) =>
                setCategoryDetails({ ...CategoryDetails, name: e.target.value })
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
                setCategoryDetails({
                  ...CategoryDetails,
                  description: e.target.value,
                })
              }
              value={CategoryDetails.description}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Category Details
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UploadCategoryDetails;
