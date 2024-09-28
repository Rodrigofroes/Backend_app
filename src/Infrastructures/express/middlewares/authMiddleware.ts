import Jwt from "jsonwebtoken";
import { User } from "../../../domains/user/entity/user.entity"
import { AuthInterface } from "./authInterface";
import { env } from "node:process";
import { Response, Request, NextFunction } from "express";


export class AuthMiddleware implements AuthInterface {

    gerarToken(id: string, name: string, email: string): string {
        let payload: any = {
            id: id,
            name: name,
            email: email
        }

        let token: string = Jwt.sign(payload, env.SECRET!, {
            expiresIn: '1h'
        });

        return token;
    }

    validarToken(req: Request, res: Response, next: NextFunction): void {
        try {
            const token: any = req.headers.authorization?.split(' ')[1];

            if (!token) {
                res.status(404).json({
                    message: 'Não autorizado',
                });
                return;
            }

            let validadeToken = Jwt.verify(token, env.SECRET!);

            if (validadeToken) {
                next();
            }

        } catch (error: any) {
            res.status(500).json({
                message: "Token inválido ou expirado"
            });
        }
    }
}