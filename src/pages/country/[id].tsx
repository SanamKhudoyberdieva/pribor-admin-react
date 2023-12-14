import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { createCountry } from '../../api/country/createCountry';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCountry, getCountry, updateCountry } from '../../api';
import { Country, CountryCreation, CountryUpdate } from '../../store/types/countryTypes';

const CountryPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currCountry, setCurrCountry] = useState<Country>();
  const initialValues: Country = {
    id: 0,
    nameUz: "",
    nameRu: "",
    nameEn: "",
    created: "",
    createdAt: "",
    updated: "",
    updatedAt: "",
    deleted: "",
    deletedAt: ""
  }

  const handleGetCountry = async (countryId: string | undefined) => {
    if (!countryId) return
    try {
      let res = await getCountry(countryId)
      setCurrCountry(res.data)
    } catch (error) {
      console.log("Error fetching country", error)
    }
  }

  const handleCreateCountry = async (values: CountryCreation) => {
    try {
      await createCountry
        ({
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
        });
        navigate("/country", { replace: true });
        showToast(t('country-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-country'), { type: 'error' });
      console.log("Error creating country", error)
    }
  }

  const handleUpdateCountry = async (values: CountryUpdate) => {
    if (!currCountry) return
    try {
      await updateCountry
        (currCountry.id, {
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
        });
      navigate("/country", { replace: true });
      showToast(t('country-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-country'), { type: 'error' });
    }
  }

  const handleDeleteCountry = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteCountry(id)
      navigate("/country", { replace: true });
      showToast(t('country-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-country'), { type: 'error' });
    }
  };

  const onSubmit = (values: Country) => {
    mode === "edit" ? handleUpdateCountry(values) : handleCreateCountry(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currCountry) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currCountry,
          nameUz: currCountry.nameUz,
          nameRu: currCountry.nameRu,
          nameEn: currCountry.nameEn,
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/country', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currCountry) ? currCountry.id : 0,
        nameUz: (mode === "edit" && currCountry) ? currCountry.nameUz : "",
        nameRu: (mode === "edit" && currCountry) ? currCountry.nameRu : "",
        nameEn: (mode === "edit" && currCountry) ? currCountry.nameEn : "",
        created: (mode === "edit" && currCountry) ? currCountry.created : "",
        createdAt: (mode === "edit" && currCountry) ? currCountry.createdAt : "",
        updated: (mode === "edit" && currCountry) ? currCountry.updated : "",
        updatedAt: (mode === "edit" && currCountry) ? currCountry.updatedAt : "",
        deleted: (mode === "edit" && currCountry) ? currCountry.deleted : "",
        deletedAt: (mode === "edit" && currCountry) ? currCountry.deletedAt : ""
      },
    }));
  }, [currCountry, mode])

  useEffect(() => {
    handleGetCountry(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/country'}>{t('country')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currCountry)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currCountry)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteCountry(id)}>{t('delete')}</button>}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4" >
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label">{t('name-uz')} *</label>
                <input 
                  type="text" 
                  name='nameUz'
                  className="form-control" 
                  value={formik.values.nameUz}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('name-ru')} *</label>
                <input 
                  type="text" 
                  name='nameRu'
                  className="form-control" 
                  value={formik.values.nameRu}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                  aria-describedby="defaultFormControlHelp"
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('name-en')} *</label>
                <input 
                  type="text" 
                  name='nameEn'
                  className="form-control" 
                  value={formik.values.nameEn}
                  onChange={formik.handleChange}
                  placeholder={t('description')}
                  aria-describedby="defaultFormControlHelp"
                />
              </div>
            </div>
          </div>
        </div>

        {mode === "edit" ? <button className="btn btn-primary me-3" type="submit">{t('save-edits')}</button> : <button className="btn btn-primary me-3" type="submit">{t('create')}</button>}
        <button className="btn btn-secondary" type="button" onClick={onCancel}>{t('cancel')}</button>
      </form>
    </>
  )
}

export default CountryPage;
