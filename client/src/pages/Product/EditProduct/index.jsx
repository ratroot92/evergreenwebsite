/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import UploadProductDetails from "./UploadProductDetails";
import UploadProductAvatar from "./UploadProductAvatar";
import UploadProductMedia from "./UploadProductMedia";
import {
  getProductById,
  resetProducts,
} from "../../../features/product/productSlice";

function EditProduct(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, isLoading, isError } = useSelector(
    (state) => state.products
  );

  React.useEffect(() => {
    if (_id && selectedProduct === null) {
      dispatch(getProductById(_id));
    }
    if (isError) {
      console.log("error");
      navigate("/");
    }
    if (selectedProduct) {
    }
  }, [_id, dispatch, isError, navigate, selectedProduct]);

  React.useEffect(() => {
    return () => dispatch(resetProducts());
  }, [dispatch]);

  if (isLoading || selectedProduct === null) {
    return <Spinner />;
  }

  return (
    <>
      <UploadProductMedia />
      <UploadProductDetails />
      <UploadProductAvatar />
    </>
  );
}

export default EditProduct;
