import { Router } from 'express';
import { UserController } from './controller/user.controller';
import { RoleController } from './controller/role.controller';
import { AuthController } from './controller/auth.controller';

import { AppRoute } from './app-route';
export class AppRouting {
    constructor(private route: Router) {
        this.route = route;
        this.configure();
    }
    public configure() {
        this.addRoute(new UserController());
        this.addRoute(new RoleController());
        this.addRoute(new AuthController());
    }

    private addRoute(appRoute: AppRoute) {
        this.route.use(appRoute.route, appRoute.router);
    }
}
