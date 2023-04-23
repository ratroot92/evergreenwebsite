import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCategoryById,
  resetCategories,
  uploadCategoryMedia,
} from "../../../features/category/categorySlice";

function UploadCategoryMedia(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCategory } = useSelector((state) => state.categories);
  const [media, setMedia] = React.useState([]);

  React.useEffect(() => {
    if (_id && !selectedCategory) {
      dispatch(getCategoryById(_id));
    }

    if (selectedCategory) {
      setMedia(selectedCategory.media.url);
    }
  }, [_id, dispatch, navigate, selectedCategory]);

  React.useEffect(() => {
    return () => dispatch(resetCategories());
  }, [dispatch]);

  React.useEffect(() => {
    console.log(media);
  }, [media]);

  function uploadMedia(e) {
    e.preventDefault();
    if (_id) {
      //   console.log(Object.values(media));
      const fd = new FormData();
      media.forEach((med) => {
        fd.append("media", med, "media");
      });
      fd.append("_id", _id);
      dispatch(uploadCategoryMedia(fd));
      toast.success("Success");
    } else {
      toast.error("Category id is not defined");
    }
  }

  return (
    <>
      <section className="heading">Upload Media</section>
      <section>
        {selectedCategory.media.map((med) => {
          return (
            <img
              src={`${process.env.REACT_APP_API_URL}${med.url}`}
              height={250}
              width={250}
              alt={med.publicId}
              className="img-fluid border"
            />
          );
        })}
      </section>
      <section className="form">
        <form onSubmit={uploadMedia}>
          <div className="form-group">
            <label>Media</label>
            <input
              type="file"
              className="form-control"
              required={true}
              _id="media"
              name="media"
              multiple={true}
              // value={media.media}
              placeholder="Enter your media"
              onChange={(e) => setMedia(Object.values(e.target.files))}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Media
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UploadCategoryMedia;
