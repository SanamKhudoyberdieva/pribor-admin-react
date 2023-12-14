import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createContact, deleteContact, getContact, updateContact } from '../../api';
import { Contact, ContactCreation, ContactUpdate } from '../../store/types/contactTypes';

const ContactPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currContact, setCurrContact] = useState<Contact>();
  const lang = localStorage.getItem("language") || "uz";
  const initialValues: Contact = {
    id: 0,
    nameUz: "",
    nameRu: "",
    nameEn: "",
    isMain: true,
    phone: "",
    Address: "",
    longitude:"",
    latitude: "",
    email: "",
    workingHours: "",
    created: "",
    createdAt: "",
    updated: "",
    updatedAt: "",
    deleted: "",
    deletedAt: ""
  }

  const handleGetContact = async (contactId: string | undefined) => {
    if (!contactId) return
    try {
      let res = await getContact(contactId)
      setCurrContact(res.data)
    } catch (error) {
      console.log("Error fetching contact", error)
    }
  }

  const handleCreateContact = async (values: ContactCreation) => {
    try {
      await createContact
        ({
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          isMain: values.isMain,
          phone: values.phone,
          Address: values.Address,
          longitude: values.longitude,
          latitude: values.latitude,
          email: values.email,
          workingHours: values.workingHours,
        });
        navigate("/contact", { replace: true });
        showToast(t('contact-successfully-created'), { type: 'success' });
    } catch (error) {
      showToast(t('error-creating-contact'), { type: 'error' });
      console.log("Error creating contact", error)
    }
  }

  const handleUpdateContact = async (values: ContactUpdate) => {
    if (!currContact) return
    try {
      await updateContact
        (currContact.id, {
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          isMain: values.isMain,
          phone: values.phone,
          Address: values.Address,
          longitude: values.longitude,
          latitude: values.latitude,
          email: values.email,
          workingHours: values.workingHours,
        });
      navigate("/contact", { replace: true });
      showToast(t('contact-successfully-updated'), { type: 'success' });
    } catch (error) {
      showToast(t('error-updating-contact'), { type: 'error' });
    }
  }

  const handleDeleteContact = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteContact(id)
      navigate("/contact", { replace: true });
      showToast(t('contact-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-contact'), { type: 'error' });
    }
  };

  const onSubmit = (values: Contact) => {
    mode === "edit" ? handleUpdateContact(values) : handleCreateContact(values)
  }

  const onCancel = () => {
    if (mode === 'edit' && currContact) {
      formik.resetForm({
        values: {
          ...initialValues,
          ...currContact,
          nameUz: currContact.nameUz,
          nameRu: currContact.nameRu,
          nameEn: currContact.nameEn,
          isMain: currContact.isMain,
          phone: currContact.phone,
          Address: currContact.Address,
          longitude: currContact.longitude,
          latitude: currContact.latitude,
          email: currContact.email,
          workingHours: currContact.workingHours,
        },
      });
    } else {
      formik.resetForm({ values: initialValues });
    }
    navigate('/contact', { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        id: (mode === "edit" && currContact) ? currContact.id : 0,
        nameUz: (mode === "edit" && currContact) ? currContact.nameUz : "",
        nameRu: (mode === "edit" && currContact) ? currContact.nameRu : "",
        nameEn: (mode === "edit" && currContact) ? currContact.nameEn : "",
        isMain: (mode === "edit" && currContact) ? currContact.isMain : true,
        phone: (mode === "edit" && currContact) ? currContact.phone : "",
        Address: (mode === "edit" && currContact) ? currContact.Address : "",
        longitude: (mode === "edit" && currContact) ? currContact.longitude : "",
        latitude: (mode === "edit" && currContact) ? currContact.latitude : "",
        email: (mode === "edit" && currContact) ? currContact.email : "",
        workingHours: (mode === "edit" && currContact) ? currContact.workingHours : "",
        created: (mode === "edit" && currContact) ? currContact.created : "",
        createdAt: (mode === "edit" && currContact) ? currContact.createdAt : "",
        updated: (mode === "edit" && currContact) ? currContact.updated : "",
        updatedAt: (mode === "edit" && currContact) ? currContact.updatedAt : "",
        deleted: (mode === "edit" && currContact) ? currContact.deleted : "",
        deletedAt: (mode === "edit" && currContact) ? currContact.deletedAt : ""
      },
    }));
  }, [currContact, mode])

  useEffect(() => {
    handleGetContact(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/contact'}>{t('contacts')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{getName(currContact, lang)}</span></li>
              <li className="breadcrumb-item active" aria-current="page">{t('edit')}</li>
            </>
          }
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{getName(currContact, lang)}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteContact(id)}>{t('delete')}</button>}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-4">
                <label className="form-label">{t('name-uz')}</label>
                <input 
                  type="text" 
                  name='nameUz'
                  className="form-control" 
                  value={formik.values.nameUz}
                  onChange={formik.handleChange}
                  placeholder={t('contact-name')}
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
                  placeholder={t('contact-name')}
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
                  placeholder={t('contact-name')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('phone')}</label>
                <input 
                  type="phone" 
                  name='phone'
                  className="form-control" 
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder={t('contact-phone')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('email')}</label>
                <input 
                  type="email" 
                  name='email'
                  className="form-control" 
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder={t('contact-email')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('address')}</label>
                <input 
                  type="text" 
                  name='Address'
                  className="form-control" 
                  value={formik.values.Address}
                  onChange={formik.handleChange}
                  placeholder={t('contact-address')}
                />
              </div>
              <div className="col-6">
                <label className="form-label">{t('working-hours')}</label>
                <input 
                  type="text" 
                  name='workingHours'
                  className="form-control" 
                  value={formik.values.workingHours}
                  onChange={formik.handleChange}
                  placeholder={t('working-hours')}
                />
              </div>
            </div>
            <div className="form-check form-switch">
              <input 
                className="form-check-input"
                type="checkbox"
                checked={formik.values.isMain}
                onChange={(e) => formik.setFieldValue('isMain', e.target.checked)}
              />
              <label className="form-check-label">{t('main-contact')}</label>
            </div>
          </div>
        </div>

        {mode === "edit" ? <button className="btn btn-primary me-3" type="submit">{t('save-edits')}</button> : <button className="btn btn-primary me-3" type="submit">{t('create')}</button>}
        <button className="btn btn-secondary" type="button" onClick={onCancel}>{t('cancel')}</button>
      </form>
    </>
  )
}

export default ContactPage;
