import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Customer = ({ mode }: { mode: string }) => {
  const { t } = useTranslation();

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/customer'}>{t('customers')}</Link></li>
                    {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
                    {mode === "edit" &&
                        <>
                            <li className="breadcrumb-item"><Link to={'/product/123/edit'}>CUSTOMER_NAME</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
                        </>
                    }
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                {mode === "edit" && <h4 className="fw-bold mb-0">CUSTOMER_NAME</h4>}
                {mode === "edit" && <button className="btn btn-danger">{t('delete')}</button>}
            </div>

            <div className="row g-3">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">{t('first-name')}</label>
                                    <input type="text" className="form-control" id="customerNameInput" placeholder="Customer first name"
                                        aria-describedby="defaultFormControlHelp" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('last-name')}</label>
                                    <input type="text" className="form-control" id="customerAddressInput"
                                        placeholder="Customer last name" aria-describedby="defaultFormControlHelp" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('phone')}</label>
                                    <input type="text" className="form-control" id="customerPhoneInput" placeholder="Customer phone"
                                        aria-describedby="defaultFormControlHelp" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('address')}</label>
                                    <input type="text" className="form-control" id="customerAddressInput" placeholder="Customer address"
                                        aria-describedby="defaultFormControlHelp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-5">
                                <label className="form-label">{t('created-at')}</label>
                                <div>03.02.2023</div>
                            </div>
                            <div>
                                <label className="form-label">{t('last-modified-at')}</label>
                                <div>03.02.2023</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <button className="btn btn-primary me-3">{t('save-edits')}</button>
                <button className="btn btn-secondary">{t('cancel')}</button>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="mb-0">{t('addresses')}</h5>
                        <Link to={"/customer/123/address/new"} className="btn btn-success">{t('add-address')}</Link>
                    </div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Address</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>13 Muhammadniyoz str, Tashkent city, Uzbekistan</td>
                                <td>
                                    <Link to={"/customer/123/address/456/edit"} className="btn btn-icon btn-warning me-2">
                                        <i className='bx bx-pencil'></i>
                                    </Link>
                                    <button className="btn btn-icon btn-danger">
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>13 Muhammadniyoz str, Tashkent city, Uzbekistan</td>
                                <td>
                                    <Link to={"/customer/123/address/456/edit"} className="btn btn-icon btn-warning me-2">
                                        <i className='bx bx-pencil'></i>
                                    </Link>
                                    <button className="btn btn-icon btn-danger">
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Customer;
