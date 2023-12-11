import { useEffect } from 'react';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from '../../api/country/getCountry';
import { setCountries } from '../../store/slices/countriesSlice';

const Countries = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { countries } = useSelector((state: RootState) => state.countriesReducer);
    console.log("countriesss", countries);

    const handleGetCountries = async () => {
        try {
            const res = await getCountry();
            dispatch(setCountries(res.data))
            console.log("res", res)
        } catch (error: any) {
            showToast(error.response.data.message || "ERROR FETCHING BRANDS", { type: 'error' });
            console.log("ERROR FETCHING BRANDS", error)
        }
    }

    useEffect(() => {
        handleGetCountries()
    }, [])

  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/country"}>{t('country')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
            </ol>
        </nav>
        
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0">{t('country')}</h4>
            <Link to={'/country/new'} className="btn btn-primary">{t('add-country')}</Link>
        </div>

        <div className="card">
            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('name')}</th>
                            <th scope="col">{t('visibility')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td><Link to={'/country/123/edit'}>COUNTRY_NAME</Link></td>
                            <td>
                                <div className="badge badge-center rounded-pill bg-label-danger">
                                    <i className='bx bx-x-circle'></i>
                                </div>
                            </td>
                            <td>
                                <Link to={'/country/123/edit'} className="btn btn-success">{t('edit')}</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Countries;
