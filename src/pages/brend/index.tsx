import { getBranch } from '../../api';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Brends = () => {
    const { t } = useTranslation();

    const fetchBranches = async () => {
        try {
            let res = await getBranch()
            console.log("Branches", res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBranches()
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/brend"}>{t('brends')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
                </ol>
            </nav>

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <h4 className="fw-bold mb-0">{t('brends')}</h4>
                <Link to={'/brend/new'} className="btn btn-primary">{t('create-brend')}</Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t('brend-name')}</th>
                                <th scope="col">{t('image')}</th>
                                <th scope="col">{t('visibility')}</th>
                                <th scope="col">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td><Link to={'/brend/123/edit'}>ABB</Link></td>
                                <td>IMAGE</td>
                                <td>
                                    <div className="badge badge-center rounded-pill bg-label-danger">
                                        <i className='bx bx-x-circle'></i>
                                    </div>
                                </td>
                                <td>
                                    <Link to={'/brend/123/edit'} className="btn btn-success">{t('edit')}</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Brends;
