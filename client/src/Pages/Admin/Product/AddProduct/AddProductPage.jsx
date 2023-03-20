/* eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../../redux/actions/category-actions';
import { clearStoreErrors } from '../../../../redux/actions/error-actions';
import { addNewProduct } from '../../../../redux/actions/product-action';

function AddProduct() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories.allCategories);
  const storeErrors = useSelector((state) => state.errors);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  React.useEffect(() => {
    console.log('storeErrors', storeErrors);
    if (storeErrors.length) {
      setTimeout(() => {
        dispatch(clearStoreErrors());
      }, 5000);
    }
  }, [storeErrors]);

  const [state, setState] = React.useState({
    name: null,
    catId: null,
  });

  const [error, setError] = React.useState({ name: null, catId: null });

  function submitForm(e) {
    e.preventDefault();
    console.log('state', state);
    if (!state.name) setError({ ...error, name: 'Product name is required !' });
    else if (!state.catId) setError({ ...error, catId: 'Product catId is required !' });
    else {
      console.log('state', state);
      dispatch(addNewProduct(state));
      setState({
        name: null,
        catId: null,
      });
    }
  }

  return (
    <div>
      <div>
        {storeErrors?.map((error, index) => (
          <p key={error + index}>{error}</p>
        ))}
      </div>
      <form onSubmit={submitForm}>
        <div className="mt-2 mb-2">
          <label>Name</label>
          <input type="text" name="name" value={state?.name} className="form-control" onChange={(e) => setState({ ...state, name: e.target.value })} />
          {error?.name ? <small className="text-danger mt-2">{error.name}</small> : <></>}
        </div>

        <div className="mt-2 mb-2">
          <label>Category</label>
          <select onChange={(e) => setState({ ...state, catId: e.target.value })} className="form-control">
            <option value="">Select Category</option>
            {allCategories?.length &&
              allCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
          {error?.catId ? <small className="text-danger mt-2">{error.catId}</small> : <></>}
        </div>
        <div className="mt-2 mb-2">
          <input type="submit" className="btn btn-sm btn-success" value="Add Product" />
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
