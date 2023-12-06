export interface CurrentAdmin {
    id: number,
    username: string,
    isSuperuser: boolean,
    createdAt: string,
    updatedAt: string,
    lastVisit: string
}
  
export interface AdminCreation {
    isSuperuser: boolean,
    password: string,
    username: string
}

export interface Admin {
    password: any
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