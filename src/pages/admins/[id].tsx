import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { createAdmin, getAdmin } from '../../api';
import { setMe } from '../../store/slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { adminCreation } from '../../store/types/adminTypes';

const Admin = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const logindata = useSelector((state: RootState) => state.loginReducer)
  console.log("logindata", logindata)

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

  const hendleCreateAdmin = async (obj: adminCreation) => {
    try {
      await createAdmin(obj)
      showSuccessMessage()
    } catch (error) {
      console.log("error createAdmin", error)
      showErrorMessage()
    }
  }

  const fetchAdmin = async () => {
    try {
      const res = await getAdmin()
      dispatch(setMe(res.data))
    } catch (error) {
      console.log("error createAdmin", error)
      showErrorMessage()
    }
  }

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
        {mode === "edit" && <button className="btn btn-danger">{t('delete')}</button>}
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="visibilitySwitch" />
            <label className="form-check-label">{t('visible')}</label>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="form-label">{t('name')}</label>
              <input type="text" className="form-control" id="productNameInput" placeholder={t('branch-name')}
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">{t('full-location')}</label>
              <input type="text" className="form-control" id="productNameInput" placeholder={t('full-location')}
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">{t('phone')}</label>
              <textarea className="form-control" name="dsfs" id="productDescInput"
                placeholder={t('phone-number')}></textarea>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary me-3">{t('save-edits')}</button>
      <button className="btn btn-secondary">{t('cancel')}</button>
    </>
  )
}

export default Admin