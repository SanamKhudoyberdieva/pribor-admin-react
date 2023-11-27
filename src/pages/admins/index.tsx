import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAdmins } from '../../api';

const Admins = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([])

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins()
      setAdmins(res.data)
    } catch (error: any) {
      // !if there was an error show the error message on alert
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
                <th scope="col">{t('branch-name')}</th>
                <th scope="col">{t('full-location')}</th>
                <th scope="col">{t('phone')}</th>
                <th scope="col">{t('visibility')}</th>
                <th scope="col">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td><Link to={'/admin/4/edit'}>Eshmat</Link></td>
                <td>12, Alisher Navoiy, Toshkent</td>
                <td>+998 90 777 77 77</td>
                <td>
                  <div className="badge badge-center rounded-pill bg-label-danger">
                    <i className='bx bx-x-circle'></i>
                  </div>
                </td>
                <td>
                  <Link to={'/admin/4/edit'} className="btn btn-success">{t('edit')}</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Admins