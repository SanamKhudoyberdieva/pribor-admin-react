import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Order = ({ mode }: { mode: string }) => {
  const { t } = useTranslation();

  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={'/order'}>{t('orders')}</Link>
                </li>
                {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
                {mode === "edit" &&
                    <>
                        <li className="breadcrumb-item"><Link to={'/order/123/edit'}>1234</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
                    </>
                }
            </ol>
        </nav>

        <div className="mb-4 d-flex align-items-center justify-content-between">
            {mode === "edit" && <h4 className="fw-bold mb-0">1234</h4>}
            {mode === "edit" && <button className="btn btn-danger">{t('delete')}</button>}
        </div>

        <div className="row g-3">
            <div className="col-md-8">
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('number')}</label>
                            <input
                            type="text"
                            className="form-control"
                            id="customerNumberInput"
                            placeholder={t('number')}
                            aria-describedby="defaultFormControlHelp" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('customer')}</label>
                            <input
                            type="text"
                            className="form-control"
                            id="customerFullNameInput"
                            placeholder={t('customer-full-name')}
                            aria-describedby="defaultFormControlHelp" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('status')}</label>
                            <input
                            type="text"
                            className="form-control"
                            id="orderStatusInput"
                            placeholder={t('order-status')}
                            aria-describedby="defaultFormControlHelp" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('country')}</label>
                            <input
                            type="text"
                            className="form-control"
                            id="countryInput"
                            placeholder={t('order-country')}
                            aria-describedby="defaultFormControlHelp" />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">{t('address')}</label>
                            <input
                            type="text"
                            className="form-control"
                            id="addressInput"
                            placeholder={t('order-address')}
                            aria-describedby="defaultFormControlHelp" />
                        </div>
                        <div className="col-12">
                            <label className="form-label">{t('notes')}</label>
                            <textarea
                            className="form-control"
                            name="dsfs"
                            id="notesInput"
                            placeholder={t('notes')}>
                            </textarea>
                        </div>
                        <div className="col-md-6">
                        <label className="form-label">{t('address')}</label>
                        <input type="text" className="form-control" id="customerAddressInput" placeholder={t('customer-address')}
                            aria-describedby="defaultFormControlHelp" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                <div className="card-body">
                    <div className="mb-4">
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

        <div className="row mb-4">
        <div className="col-md-8">
            <div className="card">
            <div className="card-body">
                <h5>{t('order-items')}</h5>
                <div className="row g-3 mb-4">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between">
                    <button className="btn badge badge-center rounded-pill bg-label-secondary">
                        <i className='bx bx-move' ></i>
                    </button>
                    <button className="btn badge badge-center rounded-pill bg-label-danger">
                        <i className='bx bxs-trash'></i>
                    </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">{t('product')} *</label>
                    <input
                    type="text"
                    className="form-control"
                    id="productInput"
                    placeholder={t('product')}
                    aria-describedby="defaultFormControlHelp" />
                </div>
                <div className="col-md-2">
                    <label className="form-label">{t('quantity')} *</label>
                    <input
                    type="text"
                    className="form-control"
                    id="quantityInput"
                    placeholder=""
                    aria-describedby="defaultFormControlHelp" />
                </div>
                <div className="col-md-4">
                    <label className="form-label">{t('unit-price')} *</label>
                    <input
                    type="text"
                    className="form-control"
                    id="unitPriceInput"
                    placeholder=""
                    aria-describedby="defaultFormControlHelp" />
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="col-md-4"></div>
        </div>

        <div className="mb-4">
            <button className="btn btn-primary me-3">{t('save-edits')}</button>
            <button className="btn btn-secondary">{t('cancel')}</button>
        </div>
    </>
  )
}

export default Order;
