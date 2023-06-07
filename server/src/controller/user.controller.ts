import { Router, Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../helpers/api';
import { AppRoute } from '../app-route';
import { RoleModel } from '../models/Role';
import { UserModel } from '../models/User';
import { IRole, IUserDoc, IUser, IRoleDoc } from 'src/types';

export class UserController implements AppRoute {
    public route = '/user';
    public router: Router = Router();
    constructor() {
        this.router.post('/seed', this.seed);
        this.router.post('/', this.create);
        this.router.get('/', this.getAll);
        this.router.get('/:id', (req, res, next) => ApiResponse.requireParams(req, res, 'id', next), this.getOne);
        this.router.delete('/:id', (req, res, next) => ApiResponse.requireParams(req, res, 'id', next), this.deleteOne);
        this.router.delete('/', this.delete);
    }

    public async create(request: Request, response: Response): Promise<any> {
        try {
            const role: IRoleDoc | null = await RoleModel.findOne({ _id: request.body.role });
            if (!role) {
                return ApiResponse.badRequest(request, response, ['Role not found.']);
            } else {
                const { firstName, lastName, email, password } = request.body;
                const newUser: IUser = {
                    firstName,
                    lastName,
                    email,
                    password,
                    role: role._id,
                };
                let user: IUserDoc | null = await UserModel.create(newUser);
                user = await UserModel.findById(user._id).populate('role');
                return ApiResponse.created(request, response, { data: user, message: 'success' });
            }
        } catch (err) {
            return ApiResponse.badRequest(request, response, {});
        }
    }
    public async getAll(request: Request, response: Response): Promise<any> {
        try {
            const users: IUserDoc[] = await UserModel.find({});
            return ApiResponse.ok(request, response, users);
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }

    public async getOne(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const user: IUserDoc | null = await UserModel.findOne({ _id: request.params.id });
            if (user) {
                return ApiResponse.ok(request, response, { data: user });
            } else {
                return ApiResponse.notFound(request, response);
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }
    public async delete(request: Request, response: Response): Promise<any> {
        try {
            const { acknowledged, deletedCount } = await UserModel.deleteMany({});
            if (deletedCount > 0) {
                return ApiResponse.noContent(request, response);
            } else {
                return ApiResponse.notFound(request, response);
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }

    public async deleteOne(request: Request, response: Response): Promise<any> {
        try {
            const user: IUserDoc | null = await UserModel.findOne({ _id: request.params.id });
            if (user) {
                const { acknowledged, deletedCount } = await UserModel.deleteOne({ _id: request.params.id });
                return ApiResponse.noContent(request, response);
            } else {
                return ApiResponse.notFound(request, response);
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }

    public async seed(request: Request, response: Response): Promise<any> {
        try {
            await UserModel.deleteMany({});
            const roles: IRoleDoc[] = await RoleModel.find({});
            if (roles.length < 2) {
                return ApiResponse.badRequest(request, response, 'Roles not found.');
            }
            const users: IUser[] = [
                {
                    firstName: 'alan',
                    lastName: 'alan',
                    email: 'alan@evergreen.com',
                    password: 'pakistan123>',
                    role: roles[0],
                },
                {
                    firstName: 'bob',
                    lastName: 'bob',
                    email: 'bob@evergreen.com',
                    password: 'pakistan123>',
                    role: roles[1],
                },
                {
                    firstName: 'calum',
                    lastName: 'calum',
                    email: 'calum@evergreen.com',
                    password: 'pakistan123>',
                    role: roles[2],
                },
            ];
            let seeds: IUserDoc[] = await Promise.all(users.map(async (user: IUser) => UserModel.create(user)));
            seeds = await UserModel.find({}).populate('role');
            return ApiResponse.ok(request, response, seeds);
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }
}
