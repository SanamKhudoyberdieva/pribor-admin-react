import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import useToast from "../../components/useToast";
import { useEffect, useState } from "react";
import { Applicant } from "../../store/types/applicantTypes";
import { deleteApplicant, getApplicant, getVacancy } from "../../api";
import { getName } from "../../utils/helperFunctions";

const ApplicantPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const lang = localStorage.getItem("language") || "uz";
  const [currVacancy, setCurrVacancy] = useState<any | null>(null);
  const [currApplicant, setCurrApplicant] = useState<Applicant>();
  const initialValues: Applicant = {
    id: 0,
    name: "",
    vacancy: "",
    vacancyId: 0,
    description: "",
    resume: "",
    createdAt: "",
    phone: ""
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

  const handleGetVacancy = async (vacancyId: number | undefined) => {
    if (!vacancyId) return
    try {
      let res = await getVacancy(vacancyId);
      setCurrVacancy(res.data);
    } catch (error) {
      console.log("Error fetching vacancy", error);
    }
  }

  useEffect(() => {
    handleGetApplicant(id)
  }, [id])

  useEffect(() => {
    if (currApplicant?.vacancyId) {
      handleGetVacancy(currApplicant.vacancyId);
    }
  }, [currApplicant]);

  console.log("currApplicant", currApplicant)

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/applicant'}>{t('applicants')}</Link></li>
            <li className="breadcrumb-item"><span>{currApplicant?.name}</span></li>
        </ol>
      </nav>
      
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h4 className="fw-bold mb-0">{currApplicant?.name}</h4>
        <button className="btn btn-danger" onClick={() => handleDeleteApplicant(id)}>{t('delete')}</button>
      </div>

      <div className="row">
        <div className="col-7">
          <div className="card mb-4">
          <div className="card-body">
            <small className="text-muted text-uppercase">About</small>
            <ul className="list-unstyled mb-4 mt-4">
              <li className="d-flex align-items-center mb-3"><i className="bx bx-user"></i><span className="fw-medium mx-2">Full Name:</span> <span>{currApplicant?.name}</span></li>
              <li className="d-flex align-items-center mb-3"><i className="bx bx-category"></i><span className="fw-medium mx-2">Job:</span> <span>{getName(currVacancy, lang)}</span></li>
            </ul>
            <small className="text-muted text-uppercase">Contacts</small>
            <ul className="list-unstyled mb-4 mt-4">
              <li className="d-flex align-items-center mb-3"><i className="bx bx-phone"></i><span className="fw-medium mx-2">Contact:</span> <span>{currApplicant?.phone}</span></li>
            </ul>
            <small className="text-muted text-uppercase">Cover letter</small>
            <ul className="list-unstyled mb-4 mt-4">
              <li className="d-flex align-items-center mb-3"><i className="bx bx-envelope me-2"></i><span>{currApplicant?.description}</span></li>
            </ul>
            <small className="text-muted text-uppercase">Resume</small>
            <ul className="list-unstyled mt-4 mb-0">
              <li className="d-flex align-items-center"><i className="bx bx-briefcase-alt-2 text-primary me-2"></i>
                <div className="d-flex flex-wrap"><span className="fw-medium me-2"><Link to={"/"}>{currApplicant?.resume}</Link></span></div>
              </li>
            </ul>
          </div>
          </div>
        </div>
        <div className="col-5">
        <div className="card mb-4">
          <div className="card-body">
            <small className="text-muted text-uppercase">{t('created-at')}</small>
            <ul className="list-unstyled mt-3 mb-0">
              <li className="d-flex align-items-center mb-3"><i className="bx bx-log-in-circle me-2"></i>
                <div className="d-flex flex-wrap"><span className="fw-medium me-2"><span>{currApplicant?.createdAt ? new Date(currApplicant.createdAt).toLocaleDateString('en-GB') : ""}</span></span></div>
              </li>
            </ul>
            <small className="text-muted text-uppercase">{t('status')}</small>
            <ul className="list-unstyled mt-3">
              <li className="d-flex align-items-center">
              <select id="form-repeater-1-4" className="form-select">
                <option value="Designer">Not Checked</option>
                <option value="Developer">Checked</option>
                <option value="Tester">Saved</option>
              </select>
              </li>
            </ul>
        </div>
      </div>
        </div>
      </div>
    </>
  )
}

export default ApplicantPage;
