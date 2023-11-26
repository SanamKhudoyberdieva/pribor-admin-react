import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Contacts = () => {
  const { t } = useTranslation();

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
                            <tr>
                                <th scope="row">1</th>
                                <td><Link to={'/contact/123/edit'}>Yunusobod</Link></td>
                                <td>12, Alisher Navoiy, Toshkent</td>
                                <td>+998 90 777 77 77</td>
                                <td>
                                    <div className="badge badge-center rounded-pill bg-label-danger">
                                        <i className='bx bx-x-circle'></i>
                                    </div>
                                </td>
                                <td>
                                    <Link to={'/contact/123/edit'} className="btn btn-success">{t('edit')}</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Contacts;
