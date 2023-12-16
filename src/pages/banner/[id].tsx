import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Banner, BannerTypes } from '../../store/types/bannerTypes';
import { createBanner, deleteBanner, getBanner, updateBanner } from '../../api';

const BannerPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const lang = localStorage.getItem("language") || "uz";
  const [currBanner, setCurrBanner] = useState<Banner>();
  const initialValues: Banner = {
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

  const handleGetBanner = async (bannerId: string | undefined) => {
    if (!bannerId) return
    try {
      let res = await getBanner(bannerId)
      setCurrBanner(res.data)
    } catch (error) {
      console.log("Error fetching banner", error)
    }
  }

  const handleCreateBanner = async (values: BannerTypes) => {
    const formData = new FormData()
    formData.append("nameUz", values.nameUz)
    formData.append("nameRu", values.nameRu)
    formData.append("nameEn", values.nameEn)
    formData.append("descriptionEn", values.descriptionEn)
    formData.append("descriptionRu", values.descriptionRu)
    formData.append("descriptionUz", values.descriptionUz)
    formData.append("image_file", values.image)
    try {
      await createBanner(formData);
      navigate("/banner", { replace: true });
      showToast(t('banner-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-banner'), { type: 'error' });
      console.log("Error creating banner", error)
    }
  }

  const handleUpdateBanner = async (values: BannerTypes) => {
    if (!currBanner) return
    const formData = new FormData()
    formData.append("nameUz", values.nameUz)
    formData.append("nameRu", values.nameRu)
    formData.append("nameEn", values.nameEn)
    formData.append("descriptionEn", values.descriptionEn)
    formData.append("descriptionRu", values.descriptionRu)
    formData.append("descriptionUz", values.descriptionUz)
    formData.append("image_file", values.image)
    try {
      await updateBanner(currBanner.id, formData);
      navigate("/banner", { replace: true });
      showToast(t('banner-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-banner'), { type: 'error' });
    }
  }

  const handleDeleteBanner = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteBanner(id)
      navigate("/banner", { replace: true });
      showToast(t('banner-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-banner'), { type: 'error' });
    }
  };

  const onSubmit = (values: Banner) => {
    mode === "edit" ? handleUpdateBanner(values) : handleCreateBanner(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currBanner) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currBanner,
          nameUz: currBanner.nameUz,
          nameRu: currBanner.nameRu,
          nameEn: currBanner.nameEn,
          descriptionEn: currBanner.descriptionEn,
          descriptionRu: currBanner.descriptionRu,
          descriptionUz: currBanner.descriptionUz,
          image: currBanner.image
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/banner', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  
  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currBanner) ? currBanner.id : 0,
        nameUz: (mode === "edit" && currBanner) ? currBanner.nameUz : "",
        nameRu: (mode === "edit" && currBanner) ? currBanner.nameRu : "",
        nameEn: (mode === "edit" && currBanner) ? currBanner.nameEn : "",
        descriptionRu: (mode === "edit" && currBanner) ? currBanner.descriptionRu : "",
        descriptionUz: (mode === "edit" && currBanner) ? currBanner.descriptionUz : "",
        descriptionEn: (mode === "edit" && currBanner) ? currBanner.descriptionEn : "",
        image: (mode === "edit" && currBanner) ? currBanner.image : "",
        created: (mode === "edit" && currBanner) ? currBanner.created : "",
        createdAt: (mode === "edit" && currBanner) ? currBanner.createdAt : "",
        updated: (mode === "edit" && currBanner) ? currBanner.updated : "",
        updatedAt: (mode === "edit" && currBanner) ? currBanner.updatedAt : "",
      },
    }));
  }, [currBanner, mode])

  useEffect(() => {
    handleGetBanner(id)
  }, [id])
  
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/banner'}>{t('banners')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currBanner, lang)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currBanner, lang)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteBanner(id)}>{t('delete')}</button>}
      </div>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
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

export default BannerPage;
