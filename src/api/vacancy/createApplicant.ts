import api from '../api';
import { ApplicantTypes } from '../../store/types/applicantTypes';

export const createApplicant = async (obj: ApplicantTypes) => {
    return await api.post("/api/vacancy/applicant", obj);
}