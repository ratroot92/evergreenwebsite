/* eslint-disable*/
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import backgroundImage from '../../../assets/images/admin_login.jpg';
import handleAction from '../../../redux/actions';

const useYupValidationResolver = (validationSchema) =>
  React.useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  username: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(8, 'Not allowed').max(25, 'Not allowed').required('Required'),
});
function UserLoginPage(props) {
  // console.log('UserLoginPage');
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      username: 'alice@evergreen.com',
      password: 'pakistan',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      const requestPayload = {
        type: 1,
        payload: username,
        password,
      };
      dispatch(handleAction({ url: '/auth/login', type: 'SET_LOGIN', reqType: 'post', payload: requestPayload }));
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="row  vh-100 wrapper">
      <div className="  col-md-3  "></div>
      <div className="  col-md-6   ">
        <div className="row ">
          <div className="  col-md-12">
            <center>
              <h2 className="text-white">User Login</h2>
            </center>
          </div>
          <div className="  col-md-12 d-flex justify-content-center align-items-center  ">
            <form className="c-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
              <div className="c-input-wrapper">
                <label className="c-label" htmlFor="username">
                  User Name
                </label>
                <input type="email" required className="c-input " placeholder="Bill" {...register('username')} />
                {errors?.username ? (
                  <small className="c-input-error-invalid">{errors.username.message}</small>
                ) : (
                  <small className="c-input-error-valid">valid!</small>
                )}
              </div>

              <div className="c-input-wrapper">
                <label className="c-label" htmlFor="password">
                  Password
                </label>
                <input required className="c-input " type="password" {...register('password')} />
                {errors?.password ? (
                  <small className="c-input-error-invalid">{errors.password.message}</small>
                ) : (
                  <small className="c-input-error-valid">valid!</small>
                )}
              </div>
              <div className="  col-md-12 text-center  ">
                <input type="submit" className="btn  btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="  col-md-3  "></div>
    </div>
  );
}

export default UserLoginPage;
