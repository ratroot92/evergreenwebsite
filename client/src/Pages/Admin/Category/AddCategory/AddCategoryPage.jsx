/* eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory } from '../../../../redux/actions/category-actions';
import { clearStoreErrors } from '../../../../redux/actions/error-actions';

function AddCategory() {
  const dispatch = useDispatch();
  const storeErrors = useSelector((state) => state.errors);

  React.useEffect(() => {
    console.log('storeErrors', storeErrors);
    if (storeErrors.length) {
      setTimeout(() => {
        dispatch(clearStoreErrors());
      }, 5000);
    }
  }, [storeErrors]);

  const [state, setState] = React.useState({
    name: '',
  });

  const [error, setError] = React.useState({ name: '', catId: '' });

  function submitForm(e) {
    e.preventDefault();
    if (!state.name) setError({ ...error, name: 'Category name is required !' });
    else {
      dispatch(addNewCategory(state));
      setState({ name: '' });
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
          <input type="submit" className="btn btn-sm btn-success" value="Add Category" />
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
