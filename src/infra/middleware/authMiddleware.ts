import e, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'process'

export class middleware {
    private constructor() { }

    public static create() {
        return new middleware();
    }

    public async gerarToken(user: any): Promise<string> {
        let payload = {
            id: user.id,
            email: user.email,
            nome: user.nome
        };

        return jwt.sign(payload, env.SECRET_KEY!, { expiresIn: 60 });
    }

    public async validarToken(req: Request, res: Response, next: NextFunction): Promise<any> {
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: 'Token não informado' });
        }
    
        try {
            const decoded = await jwt.verify(token, env.SECRET_KEY! ) as any;
            if (decoded) {
                let newToken = await this.gerarToken(decoded);
                res.setHeader('Authorization', `Bearer ${newToken}`);
                next();
            }else {
                return res.status(401).json({ message: 'Token inválido' });
            }
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    }
    
}