import { getSlider } from '../../api';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Banners = () => {
  const { t } = useTranslation();

    const fetchBanners = async () => {
        try {
            let res = await getSlider("uz")
            console.log("Banners", res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBanners()
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
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('name')}</th>
                                <th scope="col">{t('description')}</th>
                                <th scope="col">{t('visibility')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><Link to={'/banner/123/edit'}>Banner nomi</Link></td>
                                <td>Banner tavsifi</td>
                                <td>
                                    <div className="badge badge-center rounded-pill bg-label-danger">
                                        <i className='bx bx-x-circle'></i>
                                    </div>
                                </td>
                                <td>
                                    <Link to={'/banner/123/edit'} className="btn btn-success">{t('edit')}</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Banners;
