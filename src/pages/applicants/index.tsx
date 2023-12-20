import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { getApplicants, getVacancies } from "../../api";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Applicant } from "../../store/types/applicantTypes";
import { setApplicants } from "../../store/slices/applicantsSlice";
// import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import TabComponent from "../../components/TabComponent";
import { setVacancies } from "../../store/slices/vacanciesSlice";
import { getName } from "../../utils/helperFunctions";
import { Vacancy } from "../../store/types/vacancyTypes";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";


const Applicants = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const lang = localStorage.getItem("language") || "uz";
    const { vacancies } = useSelector((state: RootState) => state.vacanciesReducer);
    const { applicants } = useSelector((state: RootState) => state.applicantsReducer);

    const handleGetApplicants = async () => {
        try {
            const res = await getApplicants();
            dispatch(setApplicants(res.data))
        } catch (error: any) {
            console.log("Error fetching applicants", error)
        }
    }

    const handleGetVacancies = async () => {
        try {
            const res = await getVacancies();
            dispatch(setVacancies(res.data));
        } catch (error: any) {
            console.log("Error fetching vacancies", error);
        }
    }

    const handleTabClick = (path: string) => {
        navigate(`/applicant/${path}`);
    };

    const getVacancyName = (vacancy: Vacancy | undefined) => {
        return getName(vacancy ?? {}, lang);
    };

    useEffect(() => {
        handleGetApplicants()
        handleGetVacancies()
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

            <Tabs className="nav-align-top">
                <div className="card mb-4">
                    <div className="card-body">
                        <TabList className="nav nav-pills nav-fill">
                            <Tab className="nav-item pr-tab-nav-item">
                                <TabComponent
                                    label={t('not-checked')}
                                    path="not-checked"
                                    active={activeTab === 0}
                                    onClick={() => {
                                        setActiveTab(0);
                                        handleTabClick("not-checked");
                                    }}
                                />
                            </Tab>
                            <Tab className="nav-item pr-tab-nav-item me-2 ms-2">
                                <TabComponent
                                    label={t('checked')}
                                    path="checked"
                                    active={activeTab === 1}
                                    onClick={() => {
                                        setActiveTab(1);
                                        handleTabClick("checked");
                                    }}
                                />
                            </Tab>
                            <Tab className="nav-item pr-tab-nav-item">
                                <TabComponent
                                    label={t('saved')}
                                    path="saved"
                                    active={activeTab === 2}
                                    onClick={() => {
                                        setActiveTab(2);
                                        handleTabClick("saved");
                                    }}
                                />
                            </Tab>
                        </TabList>
                    </div>
                </div>
                <div className="tab-content">
                    <TabPanel>
                        <table className="table table-striped table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t('full-name')}</th>
                                    <th scope="col">{t('vacancy-title')}</th>
                                    <th scope="col">{t('created-at')}</th>
                                    <th scope="col">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((x: Applicant, idx) => (
                                    <tr key={"applicant-index-" + idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td><Link to={`/applicant/${x.id}/view`}>{x.name}</Link></td>
                                        <td>{getVacancyName(vacancies.find((vacancy) => vacancy.id === x.vacancyId))}</td>
                                        <td>{x.createdAt ? new Date(x.createdAt).toLocaleDateString('en-GB') : ""}</td>
                                        <td>
                                            <Link to={`/applicant/${x.id}/view`} className="btn btn-success">{t('view')}</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel>
                        <table className="table table-striped table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t('full-name')}</th>
                                    <th scope="col">{t('vacancy-title')}</th>
                                    <th scope="col">{t('created-at')}</th>
                                    <th scope="col">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((x: Applicant, idx) => (
                                    <tr key={"applicant-index-" + idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td><Link to={`/applicant/${x.id}/view`}>{x.name}</Link></td>
                                        <td>{getVacancyName(vacancies.find((vacancy) => vacancy.id === x.vacancyId))}</td>
                                        <td>{x.createdAt ? new Date(x.createdAt).toLocaleDateString('en-GB') : ""}</td>
                                        <td>
                                            <Link to={`/applicant/${x.id}/view`} className="btn btn-success">{t('view')}</Link>
                                            <select name="" id="">
                                                <option value="new">New</option>
                                                {/* <option value="checked">checked</option> */}
                                                <option value="accept">accept</option>
                                                <option value="saved">saved</option>
                                                <option value="rejected">rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel>
                        <table className="table table-striped table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t('full-name')}</th>
                                    <th scope="col">{t('vacancy-title')}</th>
                                    <th scope="col">{t('created-at')}</th>
                                    <th scope="col">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((x: Applicant, idx) => (
                                    <tr key={"applicant-index-" + idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td><Link to={`/applicant/${x.id}/view`}>{x.name}</Link></td>
                                        <td>{getVacancyName(vacancies.find((vacancy) => vacancy.id === x.vacancyId))}</td>
                                        <td>{x.createdAt ? new Date(x.createdAt).toLocaleDateString('en-GB') : ""}</td>
                                        <td>
                                            <Link to={`/applicant/${x.id}/view`} className="btn btn-success">{t('view')}</Link>
                                            <select name="" id="">
                                                <option value="new">New</option>
                                                <option value="checked">checked</option>
                                                <option value="accept">accept</option>
                                                <option value="saved">saved</option>
                                                <option value="rejected">rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TabPanel>
                </div>
            </Tabs>
        </>
    )
}

export default Applicants;
