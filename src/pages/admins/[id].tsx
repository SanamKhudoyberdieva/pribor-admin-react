import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createAdmin, getAdmin } from '../../api';
import { setMe } from '../../store/slices/loginSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { deleteAdmin } from '../../api/admin/deleteAdmin';

const Admin = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const [currUser, setCurrUser] = useState()
  const [currUser, setCurrUser] = useState<any>(null);
  

  const showSuccessMessage = () => {
    toast.success("Admin successfully created !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showErrorMessage = () => {
    toast.error("An error occurred !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const fetchAdmin = async () => {
    try {
      const res = await getAdmin()
      dispatch(setMe(res.data))
      setCurrUser(res.data);
    } catch (error) {
      console.log("error createAdmin", error)
      showErrorMessage()
    }
  }

  const DeleteAdmin = async (id: string | undefined) => {
    try {
      const res = await deleteAdmin(id)
      navigate("/admins", { replace: true });
      toast.success("Admin successfully deleted!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("admin deleted", res)
    } catch (error) {
      console.error('Error deleting admin!', error);
      showErrorMessage();
    }
  };

  const formik = useFormik({
    initialValues: {
      isSuperuser: mode === "edit" ? currUser.isSuperuser : false,
      // isSuperuser: false,
      password: "",
      username: ""
    },
    onSubmit: values => {
      const create = async () => {
        try {
          const response = await createAdmin
            ({
              isSuperuser: values.isSuperuser,
              password: values.password,
              username: values.username,
            });
          navigate("/admins", { replace: true });
          console.log(response);
          showSuccessMessage()
        } catch (error) {
          console.error('There was an error!', error);
          showErrorMessage()
        }
      };

      const update = async () => { }
      mode === "edit" ? update() : create()

      create();
    }
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
              <li className="breadcrumb-item"><Link to={'/admin/123/edit'}>Eshmat</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">Eshmat</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => DeleteAdmin(id)} >{t('delete')}</button>
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

export default Admin