import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { t } = useTranslation();

  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/order"}>{t('orders')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
            </ol>
        </nav>
        
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0">{t('orders')}</h4>
            <Link to={"/order/new"} className="btn btn-primary">{t('create-order')}</Link>
        </div>

        <div className="card">
            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('number')}</th>
                            <th scope="col">{t('customers')}</th>
                            <th scope="col">{t('status')}</th>
                            <th scope="col">{t('total-price')}</th>
                            <th scope="col">{t('shipping-cost')}</th>
                            <th scope="col">{t('order-date')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td><Link to={'/order/123/edit'}>OR239233</Link></td>
                            <td>Ernestie Hoeger</td>
                            <td><span className="badge bg-label-danger">{t('cancelled')}</span></td>
                            <td>1595.35</td>
                            <td>351.49</td>
                            <td>Jun 20, 2023</td>
                            <td>
                            <Link to={'/order/123/edit'} className="btn btn-success">{t('edit')}</Link>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td><Link to={'/order/123/edit'}>OR239233</Link></td>
                            <td>Ernestie Hoeger</td>
                            <td><span className="badge bg-label-warning">{t('processing')}</span></td>
                            <td>1595.35</td>
                            <td>351.49</td>
                            <td>Jun 20, 2023</td>
                            <td>
                            <Link to={'/order/123/edit'} className="btn btn-success">{t('edit')}</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Orders;
