export interface IRole {
    name: string;
}

export interface IRoleDoc extends IRole {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
