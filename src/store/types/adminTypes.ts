export interface adminState {
    id: number,
    username: string,
    isSuperuser: boolean,
    createdAt: string,
    updatedAt: string,
    lastVisit: string
}
  
export interface adminCreation {
    isSuperuser: boolean,
    password: string,
    username: string
}