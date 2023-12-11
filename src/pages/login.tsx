import { useFormik } from 'formik';
import { logOut, setAuthAdmin } from '../store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { authAdmin } from '../api';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { object, string } from 'yup';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const initialValues = {
    username: '',
    password: ''
  }

  const onSubmit = async (values: { username: string, password: string }) => {
    console.log("onSubmit", values)
    try {
      const response = await authAdmin
        ({
          username: values.username,
          password: values.password
        });
      dispatch(setAuthAdmin(response.data))
      navigate("/", { replace: true });
      console.log(response);
      // Handle response here
    } catch (error) {
      dispatch(logOut())
      console.error('There was an error!', error);
    }
  };

  const validationSchema = object({
    username: string().required("Reuiqred"),
    password: string().required("Required"),
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // console.log("formik touched", formik.touched)

  return (
    <main>
      <h5 className="card-header">Pribor.uz</h5>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-center h-px-500">
          <form className="w-px-400 border rounded p-3 p-md-5" onSubmit={formik.handleSubmit}>
            <h3 className="mb-3">Kirish</h3>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.errors.username && formik.touched.username && <div className='text-danger'>{formik.errors.username}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
            </div>
            <button
              className="btn btn-primary w-100 py-2 mt-4"
              type="submit"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login;