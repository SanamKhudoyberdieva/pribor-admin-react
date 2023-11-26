import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Vacancy = ({ mode }: { mode: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/vacancy'}>{t('vacancy')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><Link to={'/vacancy/123/edit'}>VACANCY_NAME</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">VACANCY_NAME</h4>}
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
              <input type="text" className="form-control" id="productNameInput" placeholder="Vakansiya nomi"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Bo'lim *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Vakansiya bo'limi"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Tavsifi *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Vakansiya tavsifi"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Имя *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Название вакансии"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Отделение *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Отдел вакансий"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Описание *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Описание вакансии"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Vacancy name"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Department *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Vacancy department"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Description *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder="Vacancy description"
                aria-describedby="defaultFormControlHelp" />
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
        <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Mas'uliyat *</label>
              <input type="text" className="form-control" id="productNameInput" placeholder=""
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Talablar *</label>
              <input type="text" className="form-control" id="productNameInput"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Manzil *</label>
              <input type="text" className="form-control" id="productNameInput"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Обязанности *</label>
              <input type="text" className="form-control" id="productNameInput"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Требования *</label>
              <input type="text" className="form-control" id="productNameInput"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Адрес *</label>
              <input type="text" className="form-control" id="productNameInput"
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Responsibilities *</label>
              <input type="text" className="form-control" id="productNameInput" 
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Requirements *</label>
              <input type="text" className="form-control" id="productNameInput" 
                aria-describedby="defaultFormControlHelp" />
            </div>
            <div className="col-12">
              <label className="form-label">Address *</label>
              <input type="text" className="form-control" id="productNameInput" 
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

export default Vacancy;
