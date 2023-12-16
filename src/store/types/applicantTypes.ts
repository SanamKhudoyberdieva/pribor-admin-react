export interface Applicant {
    id: number,
    name: string,
    vacancy: string | null,
    vacancyId: number,
    description: string,
    resume: string,
    createdAt: string,
}

export interface ApplicantTypes {
    name: string,
    vacancyId: number,
    description: string,
    resume: string,
}