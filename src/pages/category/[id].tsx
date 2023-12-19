import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../api';
import { Category, CategoryCreation, CategoryUpdate } from '../../store/types/categoryTypes';

const CategoryPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const lang = localStorage.getItem("language") || "uz";
  const [currCategory, setCurrCategory] = useState<Category>();

  const initialValues: Category = {
    id: 0,
    nameUz: "",
    nameRu: "",
    nameEn: "",
    descriptionRu: "",
    descriptionUz: "",
    descriptionEn: "",
    parent: "",
    parentId: "",
    position: "",
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

  const handleGetCategory = async (categoryId: string | undefined) => {
    if (!categoryId) return
    try {
      let res = await getCategory(categoryId);
      setCurrCategory(res.data);
    } catch (error) {
      console.log("Error fetching category", error);
    }
  }

  const handleCreateCategory = async (values: CategoryCreation) => {
    try {
      await createCategory
        ({
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          isActive: values.isActive,
          parentId: values.parentId,
          position: values.position,
          seoTitle: values.seoTitle,
          seoDescription: values.seoDescription,
        });
      navigate("/category", { replace: true });
      showToast(t('category-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-category'), { type: 'error' });
    }
  }

  const handleUpdateCategory = async (values: CategoryUpdate) => {
    if (!currCategory) return
    try {
      await updateCategory
        (currCategory.id, {
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          isActive: values.isActive,
          parentId: values.parentId,
          position: values.position,
          seoTitle: values.seoTitle,
          seoDescription: values.seoDescription,
        });
      navigate("/category", { replace: true });
      showToast(t('category-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-category'), { type: 'error' });
    }
  }

  const handleDeleteCategory = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteCategory(id)
      navigate("/category", { replace: true });
      showToast(t('category-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-category'), { type: 'error' });
    }
  };

  const onSubmit = (values: Category) => {
    mode === "edit" ? handleUpdateCategory(values) : handleCreateCategory(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currCategory) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currCategory,
          nameUz: currCategory.nameUz,
          nameRu: currCategory.nameRu,
          nameEn: currCategory.nameEn,
          isActive: currCategory.isActive,
          parentId: currCategory.parentId,
          position: currCategory.position,
          seoTitle: currCategory.seoTitle,
          seoDescription: currCategory.seoDescription,
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/category', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currCategory) ? currCategory.id : 0,
        nameUz: (mode === "edit" && currCategory) ? currCategory.nameUz : "",
        nameRu: (mode === "edit" && currCategory) ? currCategory.nameRu : "",
        nameEn: (mode === "edit" && currCategory) ? currCategory.nameEn : "",
        descriptionRu: (mode === "edit" && currCategory) ? currCategory.descriptionRu : "",
        descriptionUz: (mode === "edit" && currCategory) ? currCategory.descriptionUz : "",
        descriptionEn: (mode === "edit" && currCategory) ? currCategory.descriptionEn : "",
        parent: (mode === "edit" && currCategory) ? currCategory.parent : "",
        parentId: (mode === "edit" && currCategory) ? currCategory.parentId || "" : "", 
        position: (mode === "edit" && currCategory) ? currCategory.position || "" : "",
        seoTitle: (mode === "edit" && currCategory) ? currCategory.seoTitle : "",
        seoDescription: (mode === "edit" && currCategory) ? currCategory.seoDescription : "",
        image: (mode === "edit" && currCategory) ? currCategory.image : "",
        isActive: (mode === "edit" && currCategory) ? currCategory.isActive : true,
        created: (mode === "edit" && currCategory) ? currCategory.created : "",
        createdAt: (mode === "edit" && currCategory) ? currCategory.createdAt : "",
        updated: (mode === "edit" && currCategory) ? currCategory.updated : "",
        updatedAt: (mode === "edit" && currCategory) ? currCategory.updatedAt : "",
        deleted: (mode === "edit" && currCategory) ? currCategory.deleted : "",
        deletedAt: (mode === "edit" && currCategory) ? currCategory.deletedAt : ""
      },
    }));
  }, [currCategory, mode])

  useEffect(() => {
    handleGetCategory(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/category'}>{t('category')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currCategory, lang)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currCategory, lang)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteCategory(id)}>{t('delete')}</button>}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-4">
                <label className="form-label">{t('name-uz')} *</label>
                <input
                  type="text"
                  name='nameUz'
                  className="form-control"
                  value={formik.values.nameUz}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
                />
              </div>
              <div className="col-4">
                <label className="form-label">{t('name-ru')} *</label>
                <input
                  type="text"
                  name='nameRu'
                  className="form-control"
                  value={formik.values.nameRu}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
                />
              </div>
              <div className="col-4">
                <label className="form-label">{t('name-en')} *</label>
                <input
                  type="text"
                  name='nameEn'
                  className="form-control"
                  value={formik.values.nameEn}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('position')} *</label>
                <input
                  type="text"
                  name='position'
                  className="form-control"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('parent-name')} *</label>
                <input
                  type="text"
                  name='parentId'
                  className="form-control"
                  value={formik.values.parentId || ''}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('seo-title')} *</label>
                <input
                  type="text"
                  name='seoTitle'
                  className="form-control"
                  value={formik.values.seoTitle}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('seo-description')} *</label>
                <input
                  type="text"
                  name='seoDescription'
                  className="form-control"
                  value={formik.values.seoDescription}
                  onChange={formik.handleChange}
                  placeholder={t('category-name')}
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

        {mode === "edit" ? <button className="btn btn-primary me-3" type="submit">{t('save-edits')}</button> : <button className="btn btn-primary me-3" type="submit">{t('create')}</button>}
        <button className="btn btn-secondary" type='button' onClick={onCancel}>{t('cancel')}</button>
      </form>
    </>
  )
}

export default CategoryPage;
