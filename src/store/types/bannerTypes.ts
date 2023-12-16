export interface Banner {
    id: number,
    nameUz: string,
    nameRu: string,
    nameEn: string,
    descriptionRu: string,
    descriptionUz: string,
    descriptionEn: string,
    image: string,
    created: string|null,
    createdAt: string,
    updated: string|null,
    updatedAt: string,
}
export interface BannerTypes {
    nameEn: string,
    nameRu: string,
    nameUz: string,
    descriptionEn: string,
    descriptionRu: string,
    descriptionUz: string,
    image: string,
}