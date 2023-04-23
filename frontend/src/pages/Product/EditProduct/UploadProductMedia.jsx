import React from "react";
import {
  getProductById,
  resetProducts,
  uploadProductMedia,
} from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UploadProductMedia(props) {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct } = useSelector((state) => state.products);
  const [media, setMedia] = React.useState([]);

  React.useEffect(() => {
    if (_id && selectedProduct === null) {
      dispatch(getProductById(_id));
    }

    if (selectedProduct) {
      setMedia(selectedProduct.media.url);
    }
  }, [_id, dispatch, navigate, selectedProduct]);

  React.useEffect(() => {
    return () => dispatch(resetProducts());
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
      dispatch(uploadProductMedia(fd));
      toast.success("Success");
    } else {
      toast.error("Product id is not defined");
    }
  }

  return (
    <>
      <section className="heading">Upload Media</section>
      <section>
        {selectedProduct.media.map((med) => {
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

export default UploadProductMedia;
