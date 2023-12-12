export interface Country {
  id: number,
  nameUz: string,
  nameRu: string,
  nameEn: string,
  created: string|null,
  createdAt: string,
  updated: string|null,
  updatedAt: string,
  deleted: string|null,
  deletedAt: string|null
}

export interface CountryCreation {
  nameUz: string,
  nameRu: string,
  nameEn: string,
}

export interface CountryUpdate {
  nameUz: string,
  nameRu: string,
  nameEn: string,
}
  