import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Payments = () => {
  const { t } = useTranslation();

  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/payment"}>{t('payments')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
            </ol>
        </nav>
        
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0">{t('payments')}</h4>
            <Link to={'/payment/new'} className="btn btn-primary">{t('create-payment')}</Link>
        </div>

        <div className="card">
            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('payment-type')}</th>
                            <th scope="col">{t('visibility')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td><Link to={'/payment/123/edit'}>PAYMENT_TYPE</Link></td>
                            <td>
                                <div className="badge badge-center rounded-pill bg-label-danger">
                                    <i className='bx bx-x-circle'></i>
                                </div>
                            </td>
                            <td>
                                <Link to={'/payment/123/edit'} className="btn btn-success">{t('edit')}</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Payments;
