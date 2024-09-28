import { AuthUsecase } from "../../../../usecases/auth/auth.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class AuthRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authService: AuthUsecase
    ) { }

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz o login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */


    public static create(authService: AuthUsecase) {
        return new AuthRoute(
            "/auth/login",
            HttpMethod.POST,
            authService
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { email, password } = req.body;
                if (email && password) {
                    let resultado = await this.authService.execute({ email, password });
                    if (resultado) {
                        res.status(200).json({
                            token: resultado
                        });
                    } else {
                        res.status(404).json({
                            message: "Usuário e/ou senha inválidos"
                        })
                    }
                } else {
                    res.status(404).json({
                        message: "Parâmetros inválidos"
                    })
                }
            } catch (error: any) {
                res.status(500).json({
                    message: error.message
                })
            }
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public isProtected(): boolean {
        return false;
    }
}