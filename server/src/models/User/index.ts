import mongoose from 'mongoose';
import { IUserDoc } from 'src/types';

const userSchema: mongoose.Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Types.ObjectId, ref: 'Role', required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export const UserModel = mongoose.model<IUserDoc>(`User`, userSchema);
