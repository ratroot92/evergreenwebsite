/* eslint-disable*/
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AdminLoginBackrounImage from '../assets/images/admin-login.jpg';
import { login, reset } from '../redux/features/auth/authSlice';
import './AdminLogin.css';
import handleAction from '../redux/action';
import Spinner from '../components/Spinner';
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
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(8, 'Not allowed').max(25, 'Not allowed').required('Required'),
});
function AdminLogin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      email: 'alice@evergreen.com',
      password: 'pakistan',
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const formData = {
      type: 'email',
      payload: email,
      password,
    };
    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-8 bg-dark wrapper "></div>
        <div className="col-md-4 form-wrapper">
          <div className="row ">
            <div className="col-md-12 form-wrapper-header">
              <center>
                <h2 className="text-dark">User Login</h2>
              </center>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12  ">
                <div className="row">
                  <div className="col-md-10 offset-1">
                    <div className="row">
                      <div className="col-md-12">
                        <label className="c-label" htmlFor="email">
                          Username
                        </label>
                      </div>
                      <div className="col-md-12">
                        <div className="input-control-wrapper">
                          <input type="email" className="form-control" {...register('email', { required: true })} />
                          {errors?.email ? (
                            <small className="error-valid">
                              <FaTimesCircle size={20} color="red" />
                            </small>
                          ) : (
                            <small className="error-valid">
                              <FaCheckCircle size={20} color="green" />
                            </small>
                          )}
                        </div>
                        {/* {errors?.email ? <small className="error-invalid">{errors.email.message}</small> : <></>} */}
                        {errors?.email ? <small className="error-invalid">Required</small> : <></>}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 offset-1">
                    <div className="row">
                      <div className="col-md-12">
                        <label className="c-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div className="col-md-12">
                        <div className="input-control-wrapper">
                          <input type="password" className="form-control" {...register('password', { required: true })} />
                          {errors?.email ? (
                            <small className="error-valid">
                              <FaTimesCircle size={20} color="red" />
                            </small>
                          ) : (
                            <small className="error-valid">
                              <FaCheckCircle size={20} color="green" />
                            </small>
                          )}
                        </div>
                        {errors?.password ? <small className="error-invalid">Required</small> : <></>}
                        {/* {errors?.password ? <small className="error-invalid">{errors.password.message}</small> : <></>} */}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-10 offset-1 mt-5 ">
                    <div className="row">
                      <div className="col-md-12 btn-submit-wrapper ">
                        <input type="submit" className="btn btn-success btn-submit" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
