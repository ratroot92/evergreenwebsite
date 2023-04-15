/* eslint-disable  */
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiServer from '../../../../config/axios.config';
import { getCategoryById, updateCategoryPartial, uploadCategoryAvatar } from '../../../../redux/actions/category-actions';
import { useForm } from 'react-hook-form';
export default function index(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  let { id } = useParams();
  const [images, setImages] = React.useState([]);
  const [state, setState] = React.useState({
    isCategoryNameDisabled: true,
  });

  const selectedCategory = useSelector((images) => images.categories.selectedCategory);
  // console.log('selectedCategory', selectedCategory);
  React.useEffect(() => {
    if (id) {
      dispatch(getCategoryById(id));
    }
  }, []);

  React.useEffect(() => {
    console.log(images);
  }, [images]);

  async function uploadAllImages() {}

  async function updateCategoryName(fd) {
    try {
      dispatch(updateCategoryPartial(fd));
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(watch('name'));

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
      <div className="row">
        <div className="col-md-8 0ffset-2 ">
          {/*  */}
          <form onSubmit={handleSubmit(updateCategoryName)}>
            <div className="row " style={{ height: '500px' }}>
              <div className="col-md-12  ">
                <div className="row">
                  <div className="col-md-12">
                    <label className="  " style={{ fontSize: '12px', fontWeight: 'bold', color: 'green' }}>
                      Category Name
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <div className=" d-flex justify-content-center align-items-center">
                      {selectedCategory?.name && (
                        <input type="hidden" defaultValue={selectedCategory._id} {...register('_id', { required: true, value: selectedCategory._id })} />
                      )}
                      {selectedCategory?.name && (
                        <input
                          type="text"
                          disabled={state.isCategoryNameDisabled}
                          defaultValue={selectedCategory.name}
                          {...register('name', { required: true, value: selectedCategory.name })}
                          className="form-control form-control-sm"
                          style={{ fontSize: '14px', borderRadius: '0px 0px 0px 0px' }}
                        />
                      )}
                      {errors.name && <span>This field is required</span>}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="  d-flex justify-content-center align-items-center">
                      {state.isCategoryNameDisabled ? (
                        <button
                          onClick={() => setState({ ...state, isCategoryNameDisabled: false })}
                          className={`btn btn-sm btn-${state.isCategoryNameDisabled ? 'danger' : 'success'}`}
                          style={{ height: '30px', borderRadius: '0px 0px 0px 0px' }}
                        >
                          Edit
                        </button>
                      ) : (
                        <input
                          type="submit"
                          value="Update"
                          className={`btn btn-sm btn-${state.isCategoryNameDisabled ? 'danger' : 'success'}`}
                          style={{ height: '30px', borderRadius: '0px 0px 0px 0px' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/*  */}

          <div className="row ">
            <div className="col-md-12 d-flex justify-content-center align-items-center">
              <button className="btn btn-sm btn-success " style={{ fontSize: '14px', borderRadius: '0px 0px 0px 0px' }}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <form onSubmit={uploadAvatar}> */}
      {/* <div className="row">
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
      </div> */}

      {/* <input
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
      /> */}
      {/* </form> */}
    </div>
  );
}
