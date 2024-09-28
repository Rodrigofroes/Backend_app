import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import { config } from "dotenv";
config();

import { AuthMiddleware } from "./middlewares/authMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.config";

export class ApiExpress implements Api {
    private app: Express;

    private constructor(
        route: Route[],
        private readonly middlewareService: AuthMiddleware
    ) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.addSwagger();
        this.addRoutes(route);
    }

    private addSwagger() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    public static create(route: Route[], middlewareService: AuthMiddleware) {
        return new ApiExpress(route, middlewareService);
    }

    public addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const isProtected = route.isProtected();

            if (isProtected) {
                this.app[method](path, this.middlewareService.validarToken, handler);
            } else {
                this.app[method](path, handler);
            }

        })
    }

    public start(port: any): void {
        this.app.listen(port, () => {
            console.log("http://" + process.env.HOST + ":" + process.env.PORT);
            this.listRoutes();
            
        });
    }

    private listRoutes() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method
                }
            });

        console.log(routes);
    }
}