import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getVacancies } from '../../api';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Vacancy } from '../../store/types/vacancyTypes';
import { getName, getType } from '../../utils/helperFunctions';
import { setVacancies } from '../../store/slices/vacanciesSlice';

const Vacancies = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const lang = localStorage.getItem("language") || "uz";
    const { vacancies } = useSelector((state: RootState) => state.vacanciesReducer);
    
    const handleGetVacancies = async () => {
        try {
            const res = await getVacancies();
            dispatch(setVacancies(res.data));
        } catch (error: any) {
            console.log("Error fetching vacancies", error);
        }
    }

    useEffect(() => {
        handleGetVacancies();
    }, [])

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
                            <th scope="col">{t('job-type')}</th>
                            <th scope="col">{t('region')}</th>
                            <th scope="col">{t('visibility')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacancies.map((x: Vacancy, idx) => (
                            <tr key={"vacancy-index-" + idx}>
                                <th scope="row">{idx + 1}</th>
                                <td><Link to={`/vacancy/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                <td>{getType(x, lang)}</td>
                                <td>{x.region}</td>
                                <td>
                                    {x.isActive === true ? (
                                        <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                                    ) : (
                                        <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/vacancy/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default Vacancies;
