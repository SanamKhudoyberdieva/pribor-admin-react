export interface Category {
    id: number,
    nameUz: string,
    nameRu: string,
    nameEn: string,
    descriptionRu: string,
    descriptionUz: string,
    descriptionEn: string,
    parentId: null,
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
export interface CategoryCreation {
    nameUz: string,
    nameRu: string,
    nameEn: string,
    isActive: true,
}

export interface CategoryUpdate {
    nameUz: string,
    nameRu: string,
    nameEn: string,
    isActive: true,
    descriptionRu: string,
    descriptionUz: string,
    descriptionEn: string,
    parentId: null,
    seoTitle: string,
    seoDescription: string,
}