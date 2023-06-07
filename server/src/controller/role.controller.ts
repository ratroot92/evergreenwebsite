import { Router, Request, Response } from 'express';
import { ApiResponse } from '../helpers/api';
import { AppRoute } from '../app-route';
import { RoleModel } from '../models/Role';
import { IRoleDoc, IRole } from 'src/types';

export class RoleController implements AppRoute {
    public route = '/role';
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
            let role: IRoleDoc | null = await RoleModel.findOne({ name: request.body.name });
            if (!role) {
                role = await RoleModel.create({ name: request.body.name });
                return ApiResponse.created(request, response, role);
            } else {
                return ApiResponse.conflict(request, response);
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }
    public async getAll(request: Request, response: Response): Promise<any> {
        try {
            const roles: IRoleDoc[] = await RoleModel.find({});
            return ApiResponse.ok(request, response, roles);
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }

    public async getOne(request: Request, response: Response): Promise<any> {
        try {
            const role: IRoleDoc | null = await RoleModel.findOne({ _id: request.params.id });
            if (role) {
                return ApiResponse.ok(request, response, { data: role });
            } else {
                return ApiResponse.notFound(request, response);
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }
    public async delete(request: Request, response: Response): Promise<any> {
        try {
            const { acknowledged, deletedCount } = await RoleModel.deleteMany({});
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
            const role: IRoleDoc | null = await RoleModel.findOne({ _id: request.params.id });
            if (role) {
                const { acknowledged, deletedCount } = await RoleModel.deleteOne({ _id: request.params.id });
                return ApiResponse.ok(request, response, { acknowledged, deletedCount });
            } else {
                return ApiResponse.noContent(request, response);
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }

    public async seed(request: Request, response: Response): Promise<any> {
        try {
            await RoleModel.deleteMany({});
            const roles: IRole[] = [{ name: 'admin' }, { name: 'user' }, { name: 'super admin' }];
            const seeds: IRoleDoc[] = await Promise.all(roles.map(async (role: IRole) => RoleModel.create(role)));
            return ApiResponse.ok(request, response, seeds);
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }
}
