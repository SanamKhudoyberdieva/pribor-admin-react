import { useEffect } from 'react';
import { RootState } from '../store';
import { getProducts } from '../api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getName } from '../utils/helperFunctions';
import { Product } from '../store/types/productTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/slices/productsSlice';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lang = localStorage.getItem("language") || "uz";
  const { products } = useSelector((state: RootState) => state.productsReducer);

  const handleGetProducts = async () => {
    try {
      const res = await getProducts();
      dispatch(setProducts(res.data.products));
    } catch (error: any) {
      console.log("Error fetching products", error);
    }
  }

  useEffect(() => {
      handleGetProducts();
  }, [])

  return (
    <>
      <h4 className="fw-bold mb-4">{t('dashboard')}</h4>
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

export default Home;