import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Contact = ({ mode }: { mode: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/contact'}>{t('contacts')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><Link to={'/contact/123/edit'}>Yunusobod</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">Yunusobod</h4>}
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

export default Contact
