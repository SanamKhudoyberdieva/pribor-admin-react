import { getAdmins } from '../../api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminState } from '../../store/types/adminTypes';

const Admins = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState<adminState[]>([])

  const showErrorMessage = () => {
    toast.error("An error occurred !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins()
      setAdmins(res.data)
    } catch (error: any) {
      showErrorMessage()
      console.log("error getAdmins:", error)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])
  console.log("admins", admins)

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={"/admins"}>{t('admins')}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h4 className="fw-bold mb-0">{t('admins')}</h4>
        <Link to={'/admin/new'} className="btn btn-primary">{t('create-admin')}</Link>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t('username')}</th>
                <th scope="col">{t('created-at')}</th>
                <th scope="col">{t('updated-at')}</th>
                <th scope="col">{t('super-user')}</th>
                <th scope="col">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((x, idx) => {
                const formattedCreatedAt = x.createdAt ? new Date(x.createdAt).toLocaleDateString('en-GB') : "";
                const formattedUpdatedAt = x.updatedAt ? new Date(x.updatedAt).toLocaleDateString('en-GB') : "";
                return (
                  <tr key={"admin-index-" + idx}>
                    <th scope="row">{idx + 1}</th>
                    <td><Link to={`/admin/${x.id}/edit`}>{x.username}</Link></td>
                    <td>{formattedCreatedAt}</td>
                    <td>{formattedUpdatedAt}</td>
                    <td>
                      {
                        x.isSuperuser == true ? <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div> : <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                      }
                      
                    </td>
                    <td>
                      <Link to={`/admin/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Admins;