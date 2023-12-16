import { useEffect } from 'react';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { getCategories } from '../../api';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../../store/types/categoryTypes';
import { setCategories } from '../../store/slices/categoriesSlice';

const Categories = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { categories } = useSelector((state: RootState) => state.categoriesReducer);

    console.log("categories", categories)
    
    const handelGetCategories = async () => {
        try {
            const res = await getCategories();
            dispatch(setCategories(res.data))
        } catch (error: any) {
            showToast(error.response.data.message || t('error-fetching-categories'), { type: 'error' });
            console.log("Error fetching categories", error)
        }
    }

    useEffect(() => {
        handelGetCategories()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/category"}>{t('category')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('category')}</h4>
                <Link to={'/category/new'} className="btn btn-primary">{t('create-category')}</Link>
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
                            {categories.map((x: Category, idx) => (
                                <tr key={"category-index-" + idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td><Link to={`/category/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                    <td>
                                        {x.isActive === true ? (
                                            <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                                        ) : (
                                            <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/category/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default Categories;
