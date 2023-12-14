import { useEffect } from 'react';
import { getContacts } from '../../api';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Contact } from '../../store/types/contactTypes';
import { setContacts } from '../../store/slices/contactsSlice';

const Contacts = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { contacts } = useSelector((state: RootState) => state.contactsReducer);

    const handleGetContacts = async () => {
        try {
            const res = await getContacts();
            dispatch(setContacts(res.data))
        } catch (error: any) {
            showToast(t('error-fetching-contacts'), { type: 'error' });
            console.log("Error fetching contacts", error)
        }
    }

    useEffect(() => {
        handleGetContacts()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/contact"}>{t('contacts')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('contacts')}</h4>
                <Link to={'/contact/new'} className="btn btn-primary">{t('create-contact')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('branch-name')}</th>
                                <th scope="col">{t('full-location')}</th>
                                <th scope="col">{t('phone')}</th>
                                <th scope="col">{t('visibility')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((x: Contact, idx) => (
                                <tr key={"contact-index-" + idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td><Link to={`/contact/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                    <td>{x.Address}</td>
                                    <td>{x.phone}</td>
                                    <td>
                                        {x.isMain === true ? (
                                            <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                                        ) : (
                                            <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/contact/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Contacts;
