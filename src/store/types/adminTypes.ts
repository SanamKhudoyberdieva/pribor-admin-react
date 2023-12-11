export interface AdminCreation {
    isSuperuser: boolean,
    password: string,
    username: string
}

export interface Admin {
    password: string,
    createdAt: string,
    deletedAt: string,
    id: number,
    isActive: boolean,
    isSuperuser: boolean,
    lastVisit: string,
    updatedAt: string,
    username: string
}

export interface Admins {
    admins: Admin[],
}