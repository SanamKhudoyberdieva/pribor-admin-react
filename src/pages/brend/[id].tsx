import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createBrand, deleteBrand, getBrand, updateBrand } from '../../api';
import { Brand, BrandCreation, BrandUpdate } from '../../store/types/brandTypes';

const Brend = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currBrand, setCurrBrand] = useState<Brand>();
  const initialValues: Brand = {
    id: 0,
    nameUz: "",
    nameRu: "",
    nameEn: "",
    descriptionRu: "",
    descriptionUz: "",
    descriptionEn: "",
    seoTitle: "",
    seoDescription: "",
    image: "",
    isActive: true,
    created: "",
    createdAt: "",
    updated: "",
    updatedAt: "",
    deleted: "",
    deletedAt: ""
  }

  const handleGetBrand = async (brandId: string | undefined) => {
    if (!brandId) return
    try {
      let res = await getBrand(brandId)
      setCurrBrand(res.data)
    } catch (error) {
      console.log("Error fetching brand", error)
    }
  }

  const handleCreateBrand = async (values: BrandCreation) => {
    try {
      await createBrand
        ({
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          descriptionEn: values.descriptionEn,
          descriptionRu: values.descriptionRu,
          descriptionUz: values.descriptionUz,
          isActive: values.isActive,
          seoDescription: values.seoDescription,
          seoTitle: values.seoTitle,
          image: values.image
        });
        navigate("/brend", { replace: true });
        showToast(t('brand-successfully-created'), { type: 'success' });
    } catch (error) {
      console.log("Error creating brand", error)
    }
  }

  const handleUpdateBrand = async (values: BrandUpdate) => {
    if (!currBrand) return
    try {
      await updateBrand
        (currBrand.id, {
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          descriptionEn: values.descriptionEn,
          descriptionRu: values.descriptionRu,
          descriptionUz: values.descriptionUz,
          isActive: values.isActive,
          seoDescription: values.seoDescription,
          seoTitle: values.seoTitle,
          image: values.image
        });
        navigate("/brend", { replace: true });
        showToast(t('brand-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-brand'), { type: 'error' });
    }
  }

  const handleDeleteBrand = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteBrand(id)
      navigate("/brend", { replace: true });
      showToast(t('brand-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-brand'), { type: 'error' });
    }
  };

  const onSubmit = (values: Brand) => {
    mode === "edit" ? handleUpdateBrand(values) : handleCreateBrand(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currBrand) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currBrand,
          nameUz: currBrand.nameUz,
          nameRu: currBrand.nameRu,
          nameEn: currBrand.nameEn,
          descriptionEn: currBrand.descriptionEn,
          descriptionRu: currBrand.descriptionRu,
          descriptionUz: currBrand.descriptionUz,
          isActive: currBrand.isActive,
          seoDescription: currBrand.seoDescription,
          seoTitle: currBrand.seoTitle,
          image: currBrand.image
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/brend', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currBrand) ? currBrand.id : 0,
        nameUz: (mode === "edit" && currBrand) ? currBrand.nameUz : "",
        nameRu: (mode === "edit" && currBrand) ? currBrand.nameRu : "",
        nameEn: (mode === "edit" && currBrand) ? currBrand.nameEn : "",
        descriptionRu: (mode === "edit" && currBrand) ? currBrand.descriptionRu : "",
        descriptionUz: (mode === "edit" && currBrand) ? currBrand.descriptionUz : "",
        descriptionEn: (mode === "edit" && currBrand) ? currBrand.descriptionEn : "",
        seoTitle: (mode === "edit" && currBrand) ? currBrand.seoTitle : "",
        seoDescription: (mode === "edit" && currBrand) ? currBrand.seoDescription : "",
        image: (mode === "edit" && currBrand) ? currBrand.image : "",
        isActive: (mode === "edit" && currBrand) ? currBrand.isActive : true,
        created: (mode === "edit" && currBrand) ? currBrand.created : "",
        createdAt: (mode === "edit" && currBrand) ? currBrand.createdAt : "",
        updated: (mode === "edit" && currBrand) ? currBrand.updated : "",
        updatedAt: (mode === "edit" && currBrand) ? currBrand.updatedAt : "",
        deleted: (mode === "edit" && currBrand) ? currBrand.deleted : "",
        deletedAt: (mode === "edit" && currBrand) ? currBrand.deletedAt : ""
      },
    }));
  }, [currBrand, mode])

  useEffect(() => {
    handleGetBrand(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/brend'}>{t('brends')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currBrand)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currBrand)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteBrand(id)}>{t('delete')}</button>}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="form-check form-switch mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={formik.values.isActive}
                onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
              />
              <label className="form-check-label">{t('visible')}</label>
            </div>
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
              <div className="col-12">
                <label className="form-label">{t('seo-title')}</label>
                <input 
                  type="text"
                  name='seoTitle'
                  className="form-control" 
                  value={formik.values.seoTitle}
                  onChange={formik.handleChange}
                  placeholder={t('seo-title-full')}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('seo-description')}</label>
                <input 
                  type="text"
                  name='seoDescription'
                  className="form-control" 
                  value={formik.values.seoDescription}
                  onChange={formik.handleChange}
                  placeholder={t('seo-description-full')}
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

export default Brend;
