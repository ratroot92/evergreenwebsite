import mongoose from 'mongoose';
import { IRoleDoc } from 'src/types';

const roleSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

export const RoleModel = mongoose.model<IRoleDoc>(`Role`, roleSchema);
