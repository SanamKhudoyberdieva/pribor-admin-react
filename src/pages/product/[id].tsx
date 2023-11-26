import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Product = ({ mode }: { mode: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/product'}>{t('products')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><Link to={'/product/123/edit'}>PRODUCT_NAME</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">PRODUCT_NAME</h4>}
        {mode === "edit" && <button className="btn btn-danger">{t('delete')}</button>}
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="visibilitySwitch" />
            <label className="form-check-label">{t('visible')}</label>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Nomi *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Mahsulot nomi"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input type="text" className="form-control" id="productSlugInput" placeholder="Product Slug"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">TAVSIFI</label>
              <textarea className="form-control" name="dsfs" id="productDescInput"
                placeholder="Mahsulot tavsifi"></textarea>
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">ИМЯ *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Наименование товара"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input type="text" className="form-control" id="productSlugInput" placeholder="Product Slug"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Описание</label>
              <textarea className="form-control" name="dsfs" id="productDescInput"
                placeholder="Описание продукта"></textarea>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Product Name"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input type="text" className="form-control" id="productSlugInput" placeholder="Product Slug"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="dsfs" id="productDescInput"
                placeholder="Product Description"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h5>{t('images')}</h5>
          <input type="file" className="form-control" />
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h5>{t('pricing')}</h5>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">{t('price')} *</label>
              <input type="text" className="form-control" id="productPriceInput" placeholder={t('price')}
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t('sale')} *</label>
              <input type="text" className="form-control" id="productSaleInput" placeholder={t('sale')}
                aria-describedby="defaultFormControlHelp" />
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary me-3">{t('save-edits')}</button>
      <button className="btn btn-secondary">{t('cancel')}</button>
    </>
  )
}

export default Product;