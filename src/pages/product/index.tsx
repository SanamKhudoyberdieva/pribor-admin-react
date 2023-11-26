import { getProduct } from '../../api';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { setProducts } from '../../store/slices/productSlice';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Products = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const fetchProducts = async () => {
        try {
            let res = await getProduct("uz")
            dispatch(setProducts(res.data))
            console.log("Products", res)
        } catch (error) {
            console.log("Fetching products:", error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const products = useSelector((state: RootState) => state.productReducer)
    console.log("products state: ", products)

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
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('name')}</th>
                                <th scope="col">{t('price')}</th>
                                <th scope="col">{t('visibility')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><Link to={'/product/123/edit'}>PRODUCT_NAME</Link></td>
                                <td>{t('price')}</td>
                                <td>
                                    <div className="badge badge-center rounded-pill bg-label-danger">
                                        <i className='bx bx-x-circle'></i>
                                    </div>
                                </td>
                                <td>
                                    <Link to={'/product/123/edit'} className="btn btn-success">{t('edit')}</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Products;
