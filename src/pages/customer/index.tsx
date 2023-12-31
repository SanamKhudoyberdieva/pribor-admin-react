import { useEffect } from 'react';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { getCustomers } from '../../api';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Customer } from '../../store/types/customerTypes';
import { setCustomers } from '../../store/slices/customersSlice';

const Customers = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { customers } = useSelector((state: RootState) => state.customersReducer);

    const hendleGetCustomers = async () => {
        try {
            const res = await getCustomers()
            dispatch(setCustomers(res.data))
        } catch (error) {
            console.log("Error fetching customers", error)
        }
    }

    useEffect(() => {
        hendleGetCustomers()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/customer"}>{t('customers')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('customers')}</h4>
                <Link to={"/customer/new"} className="btn btn-primary">{t('create-customer')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('name')}</th>
                                <th scope="col">{t('phone')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((x: Customer) => (
                                <tr key={`customers-list-index-${x.id}`}>
                                    <th scope="row">1</th>
                                    <td><Link to={`/customer/${x.id}/edit`}>{x.name}</Link></td>
                                    <td>{x.phone}</td>
                                    <td>
                                        <Link to={`/customer/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default Customers;
