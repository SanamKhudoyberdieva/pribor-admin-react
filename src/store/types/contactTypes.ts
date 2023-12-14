export interface Contact {
    id: number,
    nameUz: string,
    nameRu: string,
    nameEn: string,
    isMain: boolean,
    phone: string,
    Address: string,
    longitude: string,
    latitude: string,
    email: string,
    workingHours: string,
    created: string|null,
    createdAt: string,
    updated: string|null,
    updatedAt: string,
    deleted: string|null,
    deletedAt: string|null
  }
  
  export interface ContactCreation {
    nameUz: string,
    nameRu: string,
    nameEn: string,
    isMain: any,
    phone: string,
    Address: string,
    longitude: string,
    latitude: string,
    email: string,
    workingHours: string,
  }
  
  export interface ContactUpdate {
    nameUz: string,
    nameRu: string,
    nameEn: string,
    isMain: any,
    phone: string,
    Address: string,
    longitude: string,
    latitude: string,
    email: string,
    workingHours: string,
  }
    