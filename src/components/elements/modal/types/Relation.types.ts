export interface IRelation {
    createdAt: string;
    isDeleted: boolean;
    name: string;
    updatedAt: string;
    userId: string;
    _id: string;
}

export interface RelationType {
    data: IRelation[]
}
