import { Router, Request, Response } from 'express';
import { ApiResponse } from '../helpers/api';
import { AppRoute } from '../app-route';
import { IUserDoc } from 'src/types';
import { UserModel } from '../models/User';

export class AuthController implements AppRoute {
    public route = '/auth';
    public router: Router = Router();
    constructor() {
        // this.router.get('/:id', (req, res, next) => ApiResponse.requireParams(req, res, 'id', next), this.getOne);
        // this.router.delete('/:id', (req, res, next) => ApiResponse.requireParams(req, res, 'id', next), this.deleteOne);
        this.router.post('/login', this.login);
    }

    public async login(request: Request, response: Response): Promise<any> {
        try {
            const user: IUserDoc | null = await UserModel.findOne({ email: request.body.email });
            if (!user) {
                return ApiResponse.unauthorized(request, response, 'Invalid credentials.');
            } else {
                if (request.body.password === user.password) {
                    return ApiResponse.ok(request, response, { isAuthenticated: true, user });
                }
            }
        } catch (err) {
            return ApiResponse.serverError(request, response, err);
        }
    }
}
