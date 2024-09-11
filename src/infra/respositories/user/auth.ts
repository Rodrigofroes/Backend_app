import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { env } from "process";

export class AuthRepository {
    private constructor() { }

    public static create(): AuthRepository {
        return new AuthRepository();
    }

    public gerarToken(user: any): string {
        const payload = {
            id: user.id,
            email: user.email
        };

        const token = sign(payload, env.SECRET_KEY!, {
            expiresIn: 60
        });

        return token;
    }

    public validarToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization!;
        if (!authHeader) {
            res.status(401).json({ message: 'Não autorizado!' });
        }

        const token = authHeader.split(' ')[1];

        if (token) {
            try {
                const auth = verify(token, env.SECRET_KEY!) as { id: string, email: string };
                if (auth) {
                    const newToken = sign({ id: auth.id, email: auth.email }, env.SECRET_KEY!, {
                        expiresIn: 60
                    });

                    res.setHeader('Authorization', `Bearer ${newToken}`);
                    console.log(newToken);
                    next();
                } else {
                    res.status(401).json({ message: 'Não autorizado!' });
                }
            } catch (error) {
                res.status(401).json({ message: 'Não autorizado!' });
            }
        } else {
            res.status(401).json({ message: 'Não autorizado!' });
        }
    }
}    
