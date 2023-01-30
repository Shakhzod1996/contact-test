export interface IOneContact {
    createdAt?: string;
    email: string;
    firstName: string;
    image?: string;
    isDeleted?: boolean;
    lastName: string;
    phoneNumber: string;
    relationshipId: string;
    updatedAt?: string;
    userId: string;
    _id?: string;
    relationship?: {
        createdAt: string;
        isDeleted: boolean;
        name: string;
        updatedAt: string;
        userId: string;
        __v: number;
        _id: string;
    };
}

export interface IContactsType {
    data: IOneContact[];
    _id?: string;
    selectedId?: string
    selectedItems: savedItems
    editStatus?: boolean
}

export interface IContactForm {
    email: string;
    firstName: string;
    image?: string;
    lastName: string;
    phoneNumber: string;
}

export interface savedItems {
    email: string;
    firstName: string;
    image: string | undefined;
    lastName: string;
    phoneNumber: string;
    relationship: {
        name: string;
    }
    _id: string


}
