/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import UploadCategoryDetails from "./UploadCategoryDetails";
import UploadCategoryAvatar from "./UploadCategoryAvatar";
import UploadCategoryMedia from "./UploadCategoryMedia";
import {
  getCategoryById,
  resetSelectedCategory,
} from "../../../features/category/categorySlice";

function EditCategory(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCategory, isLoading, isError } = useSelector(
    (state) => state.categories
  );

  React.useEffect(() => {
    if (_id && !selectedCategory) {
      dispatch(getCategoryById(_id));
    }
    if (isError) {
      console.log("error");
      navigate("/");
    }
    if (selectedCategory) {
    }
  }, [_id, dispatch, isError, navigate, selectedCategory]);

  // React.useEffect(() => {
  //   return () => dispatch(resetSelectedCategory());
  // }, [dispatch]);

  if (isLoading || !selectedCategory) {
    return <Spinner />;
  }

  return (
    <>
      <UploadCategoryMedia />
      <UploadCategoryDetails />
      <UploadCategoryAvatar />
    </>
  );
}

export default EditCategory;
