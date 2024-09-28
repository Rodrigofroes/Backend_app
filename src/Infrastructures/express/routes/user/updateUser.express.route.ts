import { UpdateUserUsecase } from "../../../../usecases/user/updateUser.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from 'express'

export class UpdateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserService: UpdateUserUsecase
    ) { }

    /**
     * @swagger
     * /user:
     *   put:
     *     summary: Atualiza um usuário
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: Usuário atualizado com sucesso
     *       404:
     *         description: Usuário não encontrado
     *       500:
     *         description: Erro interno no servidor
     */

    public static create(updateUserService: UpdateUserUsecase) {
        return new UpdateUserRoute(
            "/user",
            HttpMethod.PUT,
            updateUserService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { id, name, email, password } = req.body;

                if (id && name && email && password) {
                    let user: any = await this.updateUserService.execute({ id, name, email, password });
                    if (user) {
                        res.status(201).json({
                            message: "Usuário atualizado com sucesso"
                        });
                    } else {
                        res.status(404).json({
                            message: "Usuário não encontrado"
                        });
                    }
                } else {
                    res.status(404).json({
                        message: "Campos obrigatórios não preenchidos"
                    });
                }
            } catch (error: any) {
                res.status(500).json({
                    message: error.message
                });
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
        return true;
    }
}