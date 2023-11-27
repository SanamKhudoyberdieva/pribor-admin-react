import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { authAdmin } from '../api/admin/authAdmin';
import { setAuthAdmin } from '../store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.loginReducer)
  console.log("root state", state)
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      // POST request using axios with async/await
      const sendData = async () => {
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
          console.error('There was an error!', error);
        }
      };

      sendData();
    }
  });


  return (
    <main>
      <h5 className="card-header">Boy Toys Admin</h5>
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
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="form-control"
              />
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