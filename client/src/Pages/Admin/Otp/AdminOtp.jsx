/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
  otp: yup.number('Invalid Otp').required('Required'),
});

export default function AdminOtp() {
  // console.log('AdminOtp');
  const dispatch = useDispatch();
  const { loginPayload, isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      otp: 'alice@evergreen.com',
      password: 'pakistan',
    },
  });
  const onSubmit = async (formData) => {
    if (formData.otp === 0) {
      toast('Invalid otp');
      return;
    }
    const requestPayload = {
      number: formData.otp,
      validFor: '/api/auth/otp',
      type: loginPayload.type,
      payload: loginPayload.payload,
    };
  };
  return (
    <div className="row ">
      <div className="col-md-6  bg-dark" />
      <div className="col-md-6  bg-dark">
        <div className="g-center-r ">
          <form className="c-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
            <div className="c-input-wrapper">
              <label className="c-label" htmlFor="otp">
                OTP
              </label>
              <input type="number" className="c-input " placeholder="Otp" {...register('otp')} />
              {errors?.otp ? <small className="c-input-error-invalid">{errors.otp.message}</small> : <small className="c-input-error-valid">valid!</small>}
            </div>

            <div className="col-md-12 text-center  ">
              <input type="submit" className="btn  btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
