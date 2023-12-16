import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import useToast from "../../components/useToast";
import { useEffect, useState } from "react";
import { Applicant } from "../../store/types/applicantTypes";
import { deleteApplicant, getApplicant } from "../../api";

const ApplicantPage = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currApplicant, setCurrApplicant] = useState<Applicant>();
  const initialValues: Applicant = {
    id: 0,
    name: "",
    vacancy: "",
    vacancyId: 0,
    description: "",
    resume: "",
    createdAt: "",
  }

  const handleGetApplicant = async (applicantId: string | undefined) => {
    if (!applicantId) return
    try {
      let res = await getApplicant(applicantId)
      setCurrApplicant(res.data)
    } catch (error) {
      console.log("Error fetching applicant", error)
    }
  }

  const handleDeleteApplicant = async (id: string | undefined) => {
    if (!id) return
    try {
      await deleteApplicant(id)
      navigate("/applicant", { replace: true });
      showToast(t('applicant-successfully-deleted'), { type: 'success' });
    } catch (error) {
      showToast(t('error-deleting-applicant'), { type: 'error' });
    }
  };

  useEffect(() => {
    handleGetApplicant(id)
  }, [id])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/applicant'}>{t('applicants')}</Link></li>
          {mode === "create" && <li className="breadcrumb-item active" aria-current="page">{t('create')}</li>}
          {mode === "edit" &&
            <>
              <li className="breadcrumb-item"><span>{currApplicant?.name}</span></li>
            </>
          }
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {mode === "edit" && <h4 className="fw-bold mb-0">{currApplicant?.name}</h4>}
        {mode === "edit" && <button className="btn btn-danger" onClick={() => handleDeleteApplicant(id)}>{t('delete')}</button>}
      </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-4">
                <label className="form-label">{t('name')} *</label>
                <input 
                  className="form-control" 
                  value={currApplicant?.name}
                />
              </div>
              <div className="col-4">
                <label className="form-label">{t('vacancy-id')} *</label>
                <input 
                  className="form-control" 
                  value={currApplicant?.vacancyId}
                />
              </div>
              <div className="col-4">
                <label className="form-label">{t('created-at')} *</label>
                <input 
                  className="form-control" 
                  value={currApplicant?.createdAt ? new Date(currApplicant.createdAt).toLocaleDateString('en-GB') : ""}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('description')} *</label>
                <input 
                  className="form-control" 
                  value={currApplicant?.description}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t('resume')} *</label>
                <input 
                  className="form-control" 
                  value={currApplicant?.resume}
                />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ApplicantPage;
