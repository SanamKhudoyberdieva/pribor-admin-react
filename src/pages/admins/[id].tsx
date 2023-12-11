import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { activateAdmin, createAdmin, deleteAdmin, getAdmins, updateAdmin } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { RootState } from '../../store';
import { Admin } from '../../store/types/adminTypes';
import { setAdmins } from '../../store/slices/loginSlice';
import { AdminUpdateState } from './types';
import useToast from '../../components/useToast';
// import { activateAdmin, deleteAdmin, updateAdmin } from '../../api/admin';

const AdminPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { showToast } = useToast();
  const { admins } = useSelector((state: RootState) => state.loginReducer)
  const [currUser, setCurrUser] = useState<Admin>();

  useEffect(() => {
    if (!id) return
    setCurrUser(admins.find((admin) => admin.id === parseInt(id)))
  }, [admins, id])

  const fetchAdmin = async () => {
    try {
      const res = await getAdmins()
      dispatch(setAdmins(res.data))
    } catch (error) {
      showToast(t('error-fetching-admins'), { type: 'error' });
    }
  }

  const handleDeleteAdmin = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteAdmin(id)
      navigate("/admins", { replace: true });
      showToast(t('admin-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-admin'), { type: 'error' });
      console.error('Error deleting admin!', error);
    }
  };

  const handleActivateAdmin = async (id: string | undefined) => {
    if (!id) return
    try {
      await activateAdmin(id)
      navigate("/admins", { replace: true });
      showToast("ADMIN SUCCESSFULLY ACTIVATED", { type: 'success' });
    } catch (error) {
      showToast(("ERROR ACTIVATING"), { type: 'error' });
      console.error('Error activating admin!', error);
    }
  }

  const initialValues = {
    isSuperuser: false,
    password: "",
    username: ""
  }

  useEffect(() => {
    formik.setFormikState(state => ({
      ...state,
      values: {
        ...state.values,
        isSuperuser: (mode === "edit" && currUser) ? currUser.isSuperuser : false,
        password: (mode === "edit" && currUser) ? currUser.password : "",
        username: (mode === "edit" && currUser) ? currUser.username : ""
      },
    }));
  }, [currUser, mode])

  const handleCreateAdmin = async (values: AdminUpdateState) => {
    if (!values.username) return showToast("USERNAME CAN NOT BE EMPTY", { type: 'error' });
    if (!values.password) return showToast("PASSWORD CAN NOT BE EMPTY", { type: 'error' });
    try {
      await createAdmin
        ({
          isSuperuser: values.isSuperuser,
          password: values.password,
          username: values.username,
        });
      navigate("/admins", { replace: true });
      showToast(t('admin-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-admin'), { type: 'error' });
      console.error('Error creating admin', error);
    }
  };

  const handleUpdateAdmin = async (values: AdminUpdateState) => {
    if (!currUser) return
    try {
      await updateAdmin
        (currUser.id, {
          isSuperuser: values.isSuperuser,
          password: values.password,
          username: values.username,
        });
      navigate("/admins", { replace: true });
      showToast(t('admin-successfully-updated'), { type: 'success' });
    } catch (error: any) {
      console.error('There was an error!', error.response.data.message);
      showToast(error.response.data.message || t('error-updating-admin'), { type: 'error' });
    }
  }

  const onSubmit = (values: AdminUpdateState) => {
    mode === "edit" ? handleUpdateAdmin(values) : handleCreateAdmin(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    fetchAdmin()
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/admins'}>{t('admins')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('admin')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><Link to={'/admin/123/edit'}>{currUser?.username}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{currUser?.username}</h4>}
        {mode === "edit" && (currUser?.isActive ? <button className="btn btn-danger" onClick={() => handleDeleteAdmin(id)} >{t('delete')}</button> : <button className="btn btn-success" onClick={() => handleActivateAdmin(id)} >ACTIVATE</button>)
        }
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label">{t('username')}</label>
                <input
                  type="text"
                  className="form-control"
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder={t('username')}
                  aria-describedby="defaultFormControlHelp" />
              </div>
              <div className="col-12">
                <label className="form-label">{t('password')}</label>
                <input type="text"
                  className="form-control"
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder={t('password')}
                  aria-describedby="defaultFormControlHelp" />
              </div>
              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formik.values.isSuperuser}
                    onChange={(e) => formik.setFieldValue('isSuperuser', e.target.checked)}
                    id="visibilitySwitch"
                  />
                  <label className="form-check-label">{t('super-user')}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary me-3" type="submit">{t('save-edits')}</button>
        <button className="btn btn-secondary">{t('cancel')}</button>
      </form>
    </>
  )
}

export default AdminPage