import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAdmin, getAdmins } from '../../api';
import useToast from '../../components/useToast';
import { Admin } from '../../store/types/adminTypes';

const Admins = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [admin, setAdmin] = useState<Admin | null>(null);

  const handelGetAdmins = async () => {
    try {
      const res = await getAdmins()
      const sortedAdmins = res.data.sort((a: { username: string; }, b: { username: any; }) => a.username.localeCompare(b.username));
      setAdmins(sortedAdmins);
    } catch (error: any) {
      showToast(t('error-fetching-admins'), { type: 'error' });
      console.log("Error getAdmins", error)
    }
  }

  const handelGetAdmin = async () => {
    try {
      const res = await getAdmin()
      setAdmin(res.data)
    } catch (error: any) {
      showToast(t('error-fetching-admin'), { type: 'error' });
      console.log("Error getAdmin", error)
    }
  }

  useEffect(() => {
    handelGetAdmins()
    handelGetAdmin()
  }, [])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={"/admins"}>{t('admins')}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h4 className="fw-bold mb-0">{t('admin')}</h4>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t('username')}</th>
                <th scope="col">{t('created-at')}</th>
                <th scope="col">{t('updated-at')}</th>
                <th scope="col">{t('super-user')}</th>
                <th scope="col">{t('user-status')}</th>
                <th scope="col">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {admin && (
                <tr key={"admin-index"}>
                  <th scope="row">1</th>
                  <td><Link to={`/admin/${admin.id}/edit`}>{admin.username}</Link></td>
                  <td>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('en-GB') : ""}</td>
                  <td>{admin.updatedAt ? new Date(admin.updatedAt).toLocaleDateString('en-GB') : ""}</td>
                  <td>
                    {admin.isSuperuser === true ? (
                      <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                    ) : (
                      <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                    )}
                  </td>
                  <td>
                    {admin.isActive === true ? (
                      <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                    ) : (
                      <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/${admin.id}/edit`} className="btn btn-success">{t('edit')}</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
                <th scope="col">{t('user-status')}</th>
                <th scope="col">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {admins.filter(x => x.id !== admin?.id).map((x, idx) => {
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
                        x.isSuperuser === true ? <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div> : <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                      }
                    </td>
                    <td>{x.isActive === true ? (
                      <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                    ) : (
                      <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                    )}</td>
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