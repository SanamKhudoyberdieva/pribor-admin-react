import { useEffect } from 'react';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { getCountries } from '../../api';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Country } from '../../store/types/countryTypes';
import { setCountries } from '../../store/slices/countriesSlice';

const Countries = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { countries } = useSelector((state: RootState) => state.countriesReducer);

    const handleGetCountries = async () => {
        try {
            const res = await getCountries();
            dispatch(setCountries(res.data))
        } catch (error: any) {
            showToast(error.response.data.message || t('error-fetching-countries'), { type: 'error' });
            console.log("Error fetching countries", error)
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
                            <th scope="col">{t('created-at')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((x: Country, idx) => {
                            const formattedCreatedAt = x.createdAt ? new Date(x.createdAt).toLocaleDateString('en-GB') : "";
                            return (
                                <tr  key={"country-index-" + idx}>
                                <th scope="row">{idx + 1}</th>
                                <td><Link to={`/country/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                <td>{formattedCreatedAt}</td>
                                <td>
                                    <Link to={`/country/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Countries;
