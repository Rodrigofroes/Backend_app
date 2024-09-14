import { Api } from "../api";
import express, { Express } from "express";
import cors from 'cors'; 
import { Route } from "./routes/routes";
import { env } from "process";
import { middleware} from "../middleware/authMiddleware";

export class ApiExpress implements Api {
    private app: Express;

    private constructor(
        routes: Route[],
        private readonly middlewareService: middleware
    ) {
        this.app = express();
        this.app.use(express.json());

        // Adding CORS middleware
        this.app.use(cors({
            origin: env.ALLOWED_ORIGINS || '*', 
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization'], 
        }));

        this.addRoutes(routes);
    }

    public static create(routes: Route[], middlewareService: middleware ): ApiExpress {
        return new ApiExpress(routes, middlewareService);
    }

    public addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const isProtected = route.isProtected();

            if(isProtected){
                this.app[method](path, this.middlewareService.validarToken, handler);
            } else {
                this.app[method](path, handler);
            }

        })
    }

    public start(port: any): void {
        this.app.listen(port, () => {
            console.log("http://" + env.HOST + ":" + env.PORT);
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
        });

        console.table(routes);
    }
}
