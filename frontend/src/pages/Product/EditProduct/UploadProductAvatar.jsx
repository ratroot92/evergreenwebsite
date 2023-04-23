/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  getProductById,
  resetSelectedProduct,
  uploadProductAvatar,
} from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UploadProductAvatar(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct } = useSelector((state) => state.products);
  const [avatar, setAvatar] = React.useState(null);

  React.useEffect(() => {
    if (_id && selectedProduct === null) {
      dispatch(getProductById(_id));
    }

    if (selectedProduct) {
      setAvatar(selectedProduct.avatar.url);
    }
  }, [_id, dispatch, navigate, selectedProduct]);

  React.useEffect(() => {
    return () => dispatch(resetSelectedProduct());
  }, [dispatch]);

  function uploadAvatar(e) {
    e.preventDefault();
    if (_id) {
      const fd = new FormData();
      fd.append("avatar", avatar, "avatar");
      fd.append("_id", _id);
      dispatch(uploadProductAvatar(fd));
      toast.success("Success");
    } else {
      toast.error("Product id is not defined");
    }
  }

  return (
    <>
      <section className="heading">Upload Avatar</section>

      <section className="form">
        <img
          src={`${process.env.REACT_APP_API_URL}${selectedProduct.avatar.url}`}
          height={400}
          alt={selectedProduct.avatar.publicId}
          width={400}
          className="img-fluid"
        />
        <form onSubmit={uploadAvatar}>
          <div className="form-group">
            <label>Avatar</label>
            <input
              type="file"
              className="form-control"
              required={true}
              _id="avatar"
              name="avatar"
              // value={avatar.avatar}
              placeholder="Enter your avatar"
              multiple={false}
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Avatar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UploadProductAvatar;
