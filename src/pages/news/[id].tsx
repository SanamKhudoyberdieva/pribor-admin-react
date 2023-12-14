import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { New, NewTypes } from '../../store/types/newTypes';
import { createNew, deleteNew, getNew, updateNew } from '../../api';
import { getName } from '../../utils/helperFunctions';

const NewPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currNew, setCurrNew] = useState<New>();
  const lang = localStorage.getItem("language") || "uz";
  const initialValues: New = {
    id: 0,
    nameUz: "",
    nameRu: "",
    nameEn: "",
    descriptionRu: "",
    descriptionUz: "",
    descriptionEn: "",
    image: "",
    created: "",
    createdAt: "",
    updated: "",
    updatedAt: "",
  }

  console.log("currNew",currNew)

  const handleGetNew = async (newId: string | undefined) => {
    if (!newId) return
    try {
      let res = await getNew(newId)
      setCurrNew(res.data)
    } catch (error) {
      console.log("Error fetching new", error)
    }
  }

  const handleCreateNew = async (values: NewTypes) => {
    const formData = new FormData()
    formData.append("nameUz", values.nameUz)
    formData.append("nameRu", values.nameRu)
    formData.append("nameEn", values.nameEn)
    formData.append("descriptionEn", values.descriptionEn)
    formData.append("descriptionRu", values.descriptionRu)
    formData.append("descriptionUz", values.descriptionUz)
    formData.append("image_file", values.image)
    try {
      await createNew(formData);
      navigate("/new", { replace: true });
      showToast(t('new-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-news'), { type: 'error' });
      console.log("Error creating new", error)
    }
  }

  const handleUpdateNew = async (values: NewTypes) => {
    if (!currNew) return
    const formData = new FormData()
    formData.append("nameUz", values.nameUz)
    formData.append("nameRu", values.nameRu)
    formData.append("nameEn", values.nameEn)
    formData.append("descriptionEn", values.descriptionEn)
    formData.append("descriptionRu", values.descriptionRu)
    formData.append("descriptionUz", values.descriptionUz)
    formData.append("image_file", values.image)
    try {
      await updateNew(currNew.id, formData);
      navigate("/new", { replace: true });
      showToast(t('news-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-news'), { type: 'error' });
    }
  }

  const handleDeleteNew = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteNew(id)
      navigate("/new", { replace: true });
      showToast(t('news-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-news'), { type: 'error' });
    }
  };

  const onSubmit = (values: New) => {
    mode === "edit" ? handleUpdateNew(values) : handleCreateNew(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currNew) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currNew,
          nameUz: currNew.nameUz,
          nameRu: currNew.nameRu,
          nameEn: currNew.nameEn,
          descriptionEn: currNew.descriptionEn,
          descriptionRu: currNew.descriptionRu,
          descriptionUz: currNew.descriptionUz,
          image: currNew.image
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/new', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  
  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currNew) ? currNew.id : 0,
        nameUz: (mode === "edit" && currNew) ? currNew.nameUz : "",
        nameRu: (mode === "edit" && currNew) ? currNew.nameRu : "",
        nameEn: (mode === "edit" && currNew) ? currNew.nameEn : "",
        descriptionRu: (mode === "edit" && currNew) ? currNew.descriptionRu : "",
        descriptionUz: (mode === "edit" && currNew) ? currNew.descriptionUz : "",
        descriptionEn: (mode === "edit" && currNew) ? currNew.descriptionEn : "",
        image: (mode === "edit" && currNew) ? currNew.image : "",
        created: (mode === "edit" && currNew) ? currNew.created : "",
        createdAt: (mode === "edit" && currNew) ? currNew.createdAt : "",
        updated: (mode === "edit" && currNew) ? currNew.updated : "",
        updatedAt: (mode === "edit" && currNew) ? currNew.updatedAt : "",
      },
    }));
  }, [currNew, mode])

  useEffect(() => {
    handleGetNew(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/new'}>{t('news')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currNew, lang)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currNew, lang)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteNew(id)}>{t('delete')}</button>}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-12">
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
              <div className="col-12">
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
              <div className="col-12">
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

export default NewPage;
