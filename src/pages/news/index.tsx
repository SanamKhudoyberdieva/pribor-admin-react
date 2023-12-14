import { useEffect } from 'react';
import { getNews } from '../../api';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { New } from '../../store/types/newTypes';
import { getName } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../../store/slices/newsSlice';

const News = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { news } = useSelector((state: RootState) => state.newsReducer);
    
    const handleGetNews = async () => {
        try {
            const res = await getNews();
            dispatch(setNews(res.data));
        } catch (error: any) {
            showToast(t('error-fetching-news'), { type: 'error' });
            console.log("Error fetching news", error);
        }
    }

    useEffect(() => {
        handleGetNews()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/new"}>{t('news')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('news')}</h4>
                <Link to={'/new/new'} className="btn btn-primary">{t('create-news')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('news-name')}</th>
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((x: New, idx) => (
                                <tr key={"new-index-" + idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td><Link to={`/new/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                    <td>{x.image}</td>
                                    <td>
                                        <Link to={`/new/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default News;
