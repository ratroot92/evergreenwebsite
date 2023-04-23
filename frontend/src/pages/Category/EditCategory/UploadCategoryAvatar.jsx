/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCategoryById,
  resetCategories,
  uploadCategoryAvatar,
} from "../../../features/category/categorySlice";

function UploadCategoryAvatar(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCategory } = useSelector((state) => state.categories);
  const [avatar, setAvatar] = React.useState(null);

  React.useEffect(() => {
    if (_id && !selectedCategory) {
      dispatch(getCategoryById(_id));
    }

    if (selectedCategory) {
      setAvatar(selectedCategory.avatar?.url);
    }
  }, [_id, dispatch, navigate, selectedCategory]);

  React.useEffect(() => {
    return () => dispatch(resetCategories());
  }, [dispatch]);

  function uploadAvatar(e) {
    e.preventDefault();
    if (_id) {
      const fd = new FormData();
      fd.append("avatar", avatar, "avatar");
      fd.append("_id", _id);
      dispatch(uploadCategoryAvatar(fd));
      toast.success("Success");
    } else {
      toast.error("Category id is not defined");
    }
  }

  return (
    <>
      <section className="heading">Upload Avatar</section>

      <section className="form">
        <img
          src={`${process.env.REACT_APP_API_URL}${selectedCategory.avatar?.url}`}
          height={400}
          alt={selectedCategory.avatar?.publicId}
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

export default UploadCategoryAvatar;
