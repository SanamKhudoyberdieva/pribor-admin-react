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
export interface BrandTypes {
  descriptionEn: string,
  descriptionRu: string,
  descriptionUz: string,
  isActive: any,
  nameEn: string,
  nameRu: string,
  nameUz: string,
  seoDescription: string,
  seoTitle: string,
  image: string
}