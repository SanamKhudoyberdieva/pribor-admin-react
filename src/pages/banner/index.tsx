import { useEffect } from 'react';
import { getBanners } from '../../api';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { Banner } from '../../store/types/bannerTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setBanners } from '../../store/slices/bannersSlice';
import { getDescription, getName } from '../../utils/helperFunctions';

const BannersPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { banners } = useSelector((state: RootState) => state.bannersReducer);
    
    const handelGetBanners = async () => {
        try {
            const res = await getBanners();
            dispatch(setBanners(res.data));
        } catch (error: any) {
            showToast(t('error-fetching-banners'), { type: 'error' });
            console.log("Error fetching banners", error)
        }
    }

    useEffect(() => {
        handelGetBanners();
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/banner'}>{t('banners')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>
            
            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('banners')}</h4>
                <Link to={'/banner/new'} className="btn btn-primary">{t('create-banners')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('name')}</th>
                                <th scope="col">{t('description')}</th>
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((x: Banner, idx) => (
                                <tr key={"banner-index-" + idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td><Link to={`/banner/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                    <td className='pr-desc-wrapper'>{getDescription(x, lang)}</td>
                                    <td className='pr-img-wrapper'>
                                        <img
                                            src={`http://80.90.188.12:8000/public/banner/${x.image}`}  
                                            alt={x.nameUz} 
                                            className='img-fluid'
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/banner/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default BannersPage;
