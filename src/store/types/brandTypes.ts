export interface Brand {
  id: number,
  nameUz: string,
  nameRu: string,
  nameEn: string,
  descriptionRu: string,
  descriptionUz: string,
  descriptionEn: string,
  seoTitle: string,
  seoDescription: string,
  image: string,
  isActive: true,
  created: string|null,
  createdAt: string,
  updated: string|null,
  updatedAt: string,
  deleted: string|null,
  deletedAt: string|null
}
export interface BrandCreation {
  descriptionEn: string,
  descriptionRu: string,
  descriptionUz: string,
  isActive: boolean,
  nameEn: string,
  nameRu: string,
  nameUz: string,
  seoDescription: string,
  seoTitle: string,
  image: string
}
export interface BrandUpdate {
  descriptionEn: string,
  descriptionRu: string,
  descriptionUz: string,
  isActive: boolean,
  nameEn: string,
  nameRu: string,
  nameUz: string,
  seoDescription: string,
  seoTitle: string,
  image: string|null
}