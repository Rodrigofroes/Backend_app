import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/routes";
import { env } from "process";
import { AuthRepository } from "../respositories/user/auth";


export class ApiExpress implements Api {
    private app: Express;

    private constructor(
        routes: Route[],
        private readonly authService: AuthRepository = AuthRepository.create()
    ) {
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    public addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const isProtected = route.isProtected();

            if(isProtected){
                this.app[method](path, this.authService.validarToken, handler);
            } else {
                this.app[method](path, handler);
            }

        })
    }

    public start(port: any ): void {
        this.app.listen(port, () => {
            console.log("http://" + env.HOST + ":" + port);
            this.listRoutes();
        });
    }

    private listRoutes(){
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.table(routes);
    }
}