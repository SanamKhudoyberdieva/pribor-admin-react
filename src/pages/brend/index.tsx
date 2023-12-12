import { useEffect } from 'react';
import { getBrands } from '../../api';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { Brand } from '../../store/types/brandTypes';
import { getName } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setBrands } from '../../store/slices/brandsSlice';

const Brends = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { brands } = useSelector((state: RootState) => state.brandsReducer);
    
    const fetchBrands = async () => {
        try {
            const res = await getBrands();
            dispatch(setBrands(res.data))
        } catch (error: any) {
            showToast(error.response.data.message || t('error-fetching-brands'), { type: 'error' });
            console.log("Error fetching brands", error)
        }
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/brend"}>{t('brends')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('brends')}</h4>
                <Link to={'/brend/new'} className="btn btn-primary">{t('create-brend')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('brend-name')}</th>
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('visibility')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((x: Brand, idx) => (
                                <tr key={"brand-index-" + idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td><Link to={`/brend/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                    <td>{x.image}</td>
                                    <td>
                                        {x.isActive === true ? (
                                            <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                                        ) : (
                                            <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/brend/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default Brends;
