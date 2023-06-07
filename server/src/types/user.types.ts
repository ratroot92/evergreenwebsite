export interface IUser {
    firstName: string;
    lastName: string;
    role: any;
    email: string;
    password: string;
}

export interface IUserDoc extends IUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
