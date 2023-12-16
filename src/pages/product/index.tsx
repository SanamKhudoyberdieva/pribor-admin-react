import { useEffect } from 'react';
import { getProducts } from '../../api';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToast from '../../components/useToast';
import { getName } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../store/types/productTypes';
import { setProducts } from '../../store/slices/productsSlice';

const Products = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const lang = localStorage.getItem("language") || "uz";
    const { products } = useSelector((state: RootState) => state.productsReducer);

    const handleGetProducts = async () => {
        try {
            const res = await getProducts();
            dispatch(setProducts(res.data.products))
        } catch (error: any) {
            showToast(error.response.data.message || t('error-fetching-products'), { type: 'error' });
            console.log("Error fetching products", error)
        }
    }

    useEffect(() => {
        handleGetProducts()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/product'}>{t('products')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('products')}</h4>
                <Link to={"/product/new"} className="btn btn-primary">{t('create-product')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('name')}</th>
                                <th scope="col">{t('price')}</th>
                                <th scope="col">{t('brend')}</th>
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('visibility')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((x: Product, idx) => (
                                <tr key={"product-index-" + idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td><Link to={`/product/${x.id}/edit`}>{getName(x, lang)}</Link></td>
                                    <td>{x.price}</td>
                                    <td>{x.brand}</td>
                                    <td>{x.image}</td>
                                    <td>
                                        {x.isActive === true ? (
                                            <div className="badge badge-center rounded-pill bg-label-success"><i className='bx bx-check-circle'></i></div>
                                        ) : (
                                            <div className="badge badge-center rounded-pill bg-label-danger"><i className='bx bx-x-circle'></i></div>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/product/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default Products;
