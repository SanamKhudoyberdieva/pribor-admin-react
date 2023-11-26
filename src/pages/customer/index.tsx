import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Customers = () => {
  const { t } = useTranslation();

  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/customer"}>{t('customers')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
            </ol>
        </nav>
        
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0">{t('customers')}</h4>
            <Link to={"/customer/new"} className="btn btn-primary">{t('create-customer')}</Link>
        </div>

        <div className="card">
            <div className="card-body">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t('name')}</th>
                    <th scope="col">{t('phone')}</th>
                    <th scope="col">{t('actions')}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td><Link to={'/customer/123/edit'}>CUSTOMER NAME</Link></td>
                    <td>+99890 777 77 77</td>
                    <td>
                    <Link to={'/customer/123/edit'} className="btn btn-success">{t('edit')}</Link>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default Customers;
