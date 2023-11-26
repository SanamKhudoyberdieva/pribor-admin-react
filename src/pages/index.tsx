import { getProduct } from '../api';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import LanguageDropdown from '../components/LanguageDropdown';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const fetchProducts = async () => {
    try {
        let res = await getProduct("uz")
        console.log("Products", res)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
      fetchProducts()
  }, [])

  return (
    <>
      <h4 className="fw-bold mb-4">{t('dashboard')}</h4>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex p-3 justify-content-between align-items-center">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar avatar-online">
                    <img
                      src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/avatars/1.png"
                      alt="" className="w-px-40 h-auto rounded-circle" />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <span className="fw-medium d-block">John Doe</span>
                  <small className="text-muted">{t('admin')}</small>
                </div>
              </div>
              <button className="btn btn-outline-danger">{t('sign-out')}</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className="card">
            <div className="card-body p-3">
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t('image')}</th>
                <th scope="col">{t('name')}</th>
                <th scope="col">{t('price')}</th>
                <th scope="col">{t('visibility')}</th>
                <th scope="col">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td><Link to={'/product/123/edit'}>PRODUCT NAME</Link></td>
                <td>20000</td>
                <td>
                  <div className="badge badge-center rounded-pill bg-label-danger">
                    <i className='bx bx-x-circle'></i>
                  </div>
                </td>
                <td>
                  <Link to={'/product/123/edit'} className="btn btn-success">{t('edit')}</Link>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Mark</td>
                <td><Link to={'/product/123/edit'}>PRODUCT NAME</Link></td>
                <td>20000</td>
                <td>
                  <div className="badge badge-center rounded-pill bg-label-success">
                    <i className='bx bx-check-circle'></i>
                  </div>
                </td>
                <td>
                  <Link to={'/product/123/edit'} className="btn btn-success">{t('edit')}</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home;