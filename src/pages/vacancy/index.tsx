import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Vacancies = () => {
  const { t } = useTranslation();
    
  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/vacancy"}>{t('vacancy')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
            </ol>
        </nav>
        
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0">{t('vacancy')}</h4>
            <Link to={'/vacancy/new'} className="btn btn-primary">{t('create-vacancy')}</Link>
        </div>

        <div className="card">
            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('name')}</th>
                            <th scope="col">{t('department')}</th>
                            <th scope="col">{t('location')}</th>
                            <th scope="col">{t('visibility')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td><Link to={'/vacancy/123/edit'}>SMM manager</Link></td>
                            <td>Marketing</td>
                            <td>Tashkent</td>
                            <td>
                                <div className="badge badge-center rounded-pill bg-label-danger">
                                    <i className='bx bx-x-circle'></i>
                                </div>
                            </td>
                            <td>
                                <Link to={'/vacancy/123/edit'} className="btn btn-success">{t('edit')}</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Vacancies;
