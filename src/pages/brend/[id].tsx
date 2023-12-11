import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getBrand } from '../../api';
import { useEffect, useState } from 'react';
import { Brand } from '../../store/types/brandTypes';
import { getName } from '../../utils/helperFunctions';
import { useFormik } from 'formik';

const Brend = ({ mode }: { mode: string }) => {
  const { t } = useTranslation();
  const { id } = useParams()
  const [currBrand, setCurrBrand] = useState<Brand>()
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

  const handleCreateBrand = async (values: Brand) => {
    // try {
    //   await 
    // } catch (error) {
    //   console.log("first")
    // }
  }

  const handleUpdateBrand = async (values: Brand) => {
    try {

    } catch (error) {

    }
  }

  const onSubmit = (values: Brand) => {
    mode === "edit" ? handleUpdateBrand(values) : handleCreateBrand(values)
  }

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

  const handleGetBrand = async (brandId: string | undefined) => {
    if (!brandId) return
    try {
      let res = await getBrand(brandId)
      console.log("brand", res)
      setCurrBrand(res.data)
    } catch (error) {
      console.log("error getBrand: ", error)
    }
  }

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
              <li className="breadcrumb-item"><Link to={'/brend/123/edit'}>{getName(currBrand)}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>

      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currBrand)}</h4>}
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
              <label className="form-label">{t('brend-name')}</label>
              <input type="text" className="form-control" id="productNameInput" placeholder={t('brend-name')}
                aria-describedby="defaultFormControlHelp" />
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

      <button className="btn btn-primary me-3">{t('save-edits')}</button>
      <button className="btn btn-secondary">{t('cancel')}</button>
    </>
  )
}

export default Brend;
