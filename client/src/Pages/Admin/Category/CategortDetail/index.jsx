/* eslint-disable  */
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiServer from '../../../../config/axios.config';
import { getCategoryById, uploadCategoryAvatar } from '../../../../redux/actions/category-actions';

export default function index(props) {
  const dispatch = useDispatch();

  let { id } = useParams();
  const [images, setImages] = React.useState([]);

  const selectedCategory = useSelector((images) => images.categories.selectedCategory);
  console.log('selectedCategory', selectedCategory);
  React.useEffect(() => {
    if (id) {
      dispatch(getCategoryById(id));
    }
  }, []);

  React.useEffect(() => {
    console.log(images);
  }, [images]);

  async function uploadAllImages() {}

  async function uploadAvatar(image) {
    var fd = new FormData();
    fd.append('avatar', image);
    dispatch(uploadCategoryAvatar({ id, data: fd }));

    //   await apiServer
    //     .post(`/category/${id}/media/images`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (response) {
    //       console.log(response);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  }
  return (
    <div>
      <p>Name : {selectedCategory?.name}</p>
      {/* <form onSubmit={uploadAvatar}> */}
      <div className="row">
        {images?.imagesArr?.length &&
          images?.imagesArr?.map((image) => {
            return (
              <div key={image?.name + image?.size} className="col-md-3 text-center">
                <img src={URL.createObjectURL(image)} height="200" width={'200'} />
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setImages({ ...images, imagesArr: images.imagesArr.filter((i) => i.name !== image.name) });
                  }}
                >
                  Set as Avatar
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    uploadAvatar(image);
                  }}
                >
                  Upload
                </button>
              </div>
            );
          })}
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            uploadAllImages();
          }}
        >
          Upload All
        </button>
      </div>

      <input
        type="file"
        multiple={true}
        onChange={(event) => {
          setImages({
            imagesArr: Object.keys(event.target.files).reduce((arr, key) => {
              arr.push(event.target.files[key]);
              return arr;
            }, []),
            imagesDict: event.target.files,
          });
        }}
        name="images"

        // value={images?.images}
      />
      {/* </form> */}
    </div>
  );
}
