import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useToast from '../../components/useToast';
import { useEffect, useState } from 'react';
import { Vacancy, VacancyTypes } from '../../store/types/vacancyTypes';
import { createVacancy, deleteVacancy, getVacancy, updateVacancy } from '../../api';
import { useFormik } from 'formik';
import { getName } from '../../utils/helperFunctions';

const VacancyPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currVacancy, setCurrVacancy] = useState<Vacancy>();
  const lang = localStorage.getItem("language") || "uz";
  const initialValues: Vacancy = {
    id: 0,
    nameUz: "",
    nameRu: "",
    nameEn: "",
    descriptionRu: "",
    descriptionUz: "",
    descriptionEn: "",
    image: "",
    isActive: true,
    region: "",
    requirementEn: "",
    requirementRu: "",
    requirementUz: "",
    responsibilityEn: "",
    responsibilityRu: "",
    responsibilityUz: "",
    typeEn: "",
    typeRu: "",
    typeUz: "",
    created: "",
    createdAt: "",
    updated: "",
    updatedAt: "",
  }

  const handleGetVacancy = async (vacancyId: string | undefined) => {
    if (!vacancyId) return
    try {
      let res = await getVacancy(vacancyId)
      setCurrVacancy(res.data)
    } catch (error) {
      console.log("Error fetching vacancy", error)
    }
  }

  const handleCreateVacancy = async (values: VacancyTypes) => {
    const formData = new FormData()
    formData.append("nameUz", values.nameUz)
    formData.append("nameRu", values.nameRu)
    formData.append("nameEn", values.nameEn)
    formData.append("descriptionEn", values.descriptionEn)
    formData.append("descriptionRu", values.descriptionRu)
    formData.append("descriptionUz", values.descriptionUz)
    formData.append("isActive", values.isActive)
    formData.append("region", values.region)
    formData.append("requirementEn", values.requirementEn)
    formData.append("requirementRu", values.requirementRu)
    formData.append("requirementUz", values.requirementUz)
    formData.append("responsibilityEn", values.responsibilityEn)
    formData.append("responsibilityRu", values.responsibilityRu)
    formData.append("responsibilityUz", values.responsibilityUz)
    formData.append("typeEn", values.typeEn)
    formData.append("typeRu", values.typeRu)
    formData.append("typeUz", values.typeUz)
    formData.append("image_file", values.image)
    try {
      await createVacancy(formData);
      navigate("/vacancy", { replace: true });
      showToast(t('vacancy-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-vacancy'), { type: 'error' });
      console.log("Error creating vacancy", error)
    }
  }

  const handleUpdateVacancy = async (values: VacancyTypes) => {
    if (!currVacancy) return
    const formData = new FormData()
    formData.append("nameUz", values.nameUz)
    formData.append("nameRu", values.nameRu)
    formData.append("nameEn", values.nameEn)
    formData.append("descriptionEn", values.descriptionEn)
    formData.append("descriptionRu", values.descriptionRu)
    formData.append("descriptionUz", values.descriptionUz)
    formData.append("isActive", values.isActive)
    formData.append("region", values.region)
    formData.append("requirementEn", values.requirementEn)
    formData.append("requirementRu", values.requirementRu)
    formData.append("requirementUz", values.requirementUz)
    formData.append("responsibilityEn", values.responsibilityEn)
    formData.append("responsibilityRu", values.responsibilityRu)
    formData.append("responsibilityUz", values.responsibilityUz)
    formData.append("typeEn", values.typeEn)
    formData.append("typeRu", values.typeRu)
    formData.append("typeUz", values.typeUz)
    formData.append("image_file", values.image)
    try {
      await updateVacancy(currVacancy.id, formData);
      navigate("/vacancy", { replace: true });
      showToast(t('vacancy-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-vacancy'), { type: 'error' });
    }
  }

  const handleDeleteVacancy = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteVacancy(id)
      navigate("/vacancy", { replace: true });
      showToast(t('vacancy-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-vacancy'), { type: 'error' });
    }
  };

  const onSubmit = (values: Vacancy) => {
    mode === "edit" ? handleUpdateVacancy(values) : handleCreateVacancy(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currVacancy) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currVacancy,
          nameUz: currVacancy.nameUz,
          nameRu: currVacancy.nameRu,
          nameEn: currVacancy.nameEn,
          descriptionEn: currVacancy.descriptionEn,
          descriptionRu: currVacancy.descriptionRu,
          descriptionUz: currVacancy.descriptionUz,
          isActive: currVacancy.isActive,
          image: currVacancy.image,
          region: currVacancy.region,
          requirementEn: currVacancy.requirementEn,
          requirementRu: currVacancy.requirementRu,
          requirementUz: currVacancy.requirementUz,
          responsibilityEn: currVacancy.requirementEn,
          responsibilityRu: currVacancy.requirementRu,
          responsibilityUz: currVacancy.descriptionUz,
          typeEn: currVacancy.typeEn,
          typeRu: currVacancy.typeRu,
          typeUz: currVacancy.typeUz,
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/vacancy', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  
  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currVacancy) ? currVacancy.id : 0,
        nameUz: (mode === "edit" && currVacancy) ? currVacancy.nameUz : "",
        nameRu: (mode === "edit" && currVacancy) ? currVacancy.nameRu : "",
        nameEn: (mode === "edit" && currVacancy) ? currVacancy.nameEn : "",
        descriptionRu: (mode === "edit" && currVacancy) ? currVacancy.descriptionRu : "",
        descriptionUz: (mode === "edit" && currVacancy) ? currVacancy.descriptionUz : "",
        descriptionEn: (mode === "edit" && currVacancy) ? currVacancy.descriptionEn : "",
        region: (mode === "edit" && currVacancy) ? currVacancy.region : "",
        requirementEn: (mode === "edit" && currVacancy) ? currVacancy.requirementEn : "",
        requirementRu: (mode === "edit" && currVacancy) ? currVacancy.requirementRu : "",
        requirementUz: (mode === "edit" && currVacancy) ? currVacancy.requirementUz : "",
        responsibilityEn: (mode === "edit" && currVacancy) ? currVacancy.responsibilityEn : "",
        responsibilityRu: (mode === "edit" && currVacancy) ? currVacancy.responsibilityRu : "",
        responsibilityUz: (mode === "edit" && currVacancy) ? currVacancy.responsibilityUz : "",
        typeEn: (mode === "edit" && currVacancy) ? currVacancy.typeEn : "",
        typeRu: (mode === "edit" && currVacancy) ? currVacancy.typeRu : "",
        typeUz: (mode === "edit" && currVacancy) ? currVacancy.typeUz : "",
        image: (mode === "edit" && currVacancy) ? currVacancy.image : "",
        isActive: (mode === "edit" && currVacancy) ? currVacancy.isActive : true,
        created: (mode === "edit" && currVacancy) ? currVacancy.created : "",
        createdAt: (mode === "edit" && currVacancy) ? currVacancy.createdAt : "",
        updated: (mode === "edit" && currVacancy) ? currVacancy.updated : "",
        updatedAt: (mode === "edit" && currVacancy) ? currVacancy.updatedAt : ""
      },
    }));
  }, [currVacancy, mode])

  useEffect(() => {
    handleGetVacancy(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/vacancy'}>{t('vacancy')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currVacancy, lang)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currVacancy, lang)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteVacancy(id)}>{t('delete')}</button>}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">{t('name-uz')}</label>
                <input
                  type="text"
                  name='nameUz'
                  className="form-control"
                  value={formik.values.nameUz}
                  onChange={formik.handleChange}
                  placeholder={t('brend-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('type-uz')}</label>
                <input
                  type="text"
                  name='typeUz'
                  className="form-control"
                  value={formik.values.typeUz}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('requirement-uz')}</label>
                <input
                  type="text"
                  name='requirementRu'
                  className="form-control"
                  value={formik.values.requirementRu}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('responsibility-uz')}</label>
                <input
                  type="text"
                  name='responsibilityUz'
                  className="form-control"
                  value={formik.values.responsibilityUz}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('description-uz')}</label>
                <input
                  type="text"
                  name='descriptionUz'
                  className="form-control"
                  value={formik.values.descriptionUz}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">{t('name-ru')}</label>
                <input
                  type="text"
                  name='nameRu'
                  className="form-control"
                  value={formik.values.nameRu}
                  onChange={formik.handleChange}
                  placeholder={t('brend-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('type-ru')}</label>
                <input
                  type="text"
                  name='typeRu'
                  className="form-control"
                  value={formik.values.typeRu}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('requirement-ru')}</label>
                <input
                  type="text"
                  name='requirementRu'
                  className="form-control"
                  value={formik.values.requirementRu}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('responsibility-ru')}</label>
                <input
                  type="text"
                  name='responsibilityRu'
                  className="form-control"
                  value={formik.values.responsibilityRu}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('description-ru')}</label>
                <input
                  type="text"
                  name='descriptionRu'
                  className="form-control"
                  value={formik.values.descriptionRu}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">{t('name-en')}</label>
                <input
                  type="text"
                  name='nameEn'
                  className="form-control"
                  value={formik.values.nameEn}
                  onChange={formik.handleChange}
                  placeholder={t('brend-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('type-en')}</label>
                <input
                  type="text"
                  name='typeEn'
                  className="form-control"
                  value={formik.values.typeEn}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('requirement-en')}</label>
                <input
                  type="text"
                  name='requirementEn'
                  className="form-control"
                  value={formik.values.requirementEn}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('responsibility-en')}</label>
                <input
                  type="text"
                  name='responsibilityEn'
                  className="form-control"
                  value={formik.values.responsibilityEn}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('description-en')}</label>
                <input
                  type="text"
                  name='descriptionEn'
                  className="form-control"
                  value={formik.values.descriptionEn}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label">{t('region')}</label>
                <input
                  type="text"
                  name='region'
                  className="form-control"
                  value={formik.values.region}
                  onChange={formik.handleChange}
                  placeholder={t('brend-name')}
                />
              </div>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formik.values.isActive}
                onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
              />
              <label className="form-check-label">{t('visible')}</label>
            </div>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h5>{t('images')}</h5>
            <input
              type="file"
              onChange={(e) => e.currentTarget.files && formik.setFieldValue("image", e.currentTarget.files[0])}
              name='image'
              className="form-control"
            />
          </div>
        </div>

        {mode === "edit" ? <button className="btn btn-primary me-3" type="submit">{t('save-edits')}</button> : <button className="btn btn-primary me-3" type="submit">{t('create')}</button>}
        <button className="btn btn-secondary" type='button' onClick={onCancel}>{t('cancel')}</button>
      </form>
    </>
  )
}

export default VacancyPage;
