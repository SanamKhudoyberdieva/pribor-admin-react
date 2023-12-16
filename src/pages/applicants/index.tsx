import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { getApplicants } from "../../api";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Applicant } from "../../store/types/applicantTypes";
import { setApplicants } from "../../store/slices/applicantsSlice";


const Applicants = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const lang = localStorage.getItem("language") || "uz";
    const { applicants } = useSelector((state: RootState) => state.applicantsReducer);
    
    const handleGetApplicants = async () => {
        try {
            const res = await getApplicants();
            dispatch(setApplicants(res.data))
        } catch (error: any) {
            console.log("Error fetching applicants", error)
        }
    }

    useEffect(() => {
        handleGetApplicants()
    }, [])

  return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/applicant"}>{t('applicants')}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{t('list')}</li>
            </ol>
        </nav>
        
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0">{t('applicants')}</h4>
        </div>

        <div className="card">
            <div className="card-body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('name')}</th>
                            <th scope="col">{t('vacancy-id')}</th>
                            <th scope="col">{t('created-at')}</th>
                            <th scope="col">{t('resume')}</th>
                            <th scope="col">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((x: Applicant, idx) => (
                            <tr key={"applicant-index-" + idx}>
                                <th scope="row">{idx + 1}</th>
                                <td><Link to={`/applicant/${x.id}/edit`}>{x.name}</Link></td>
                                <td>{x.vacancyId}</td>
                                <td>{x.createdAt ? new Date(x.createdAt).toLocaleDateString('en-GB') : ""}</td>
                                <td>{x.resume}</td>
                                <td>
                                    <Link to={`/applicant/${x.id}/edit`} className="btn btn-success">{t('edit')}</Link>
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

export default Applicants;
