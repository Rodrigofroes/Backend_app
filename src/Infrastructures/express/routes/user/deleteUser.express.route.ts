import { DeleteUserUsecase } from "../../../../usecases/user/deleteUser.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from 'express'

export class DeleteUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserService: DeleteUserUsecase
    ) { }

    /**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário deletado com sucesso"
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parâmetros inválidos"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro interno no servidor"
 */

    public static create(deleteUserService: DeleteUserUsecase) {
        return new DeleteUserRoute(
            "/user/:id",
            HttpMethod.DELETE,
            deleteUserService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { id } = req.params;
                if (id) {
                    let user = await this.deleteUserService.execute({ id });
                    if (user) {
                        res.status(201).json({
                            message: "Usuário deletado com sucesso"
                        });
                    } else {
                        res.status(404).json({
                            message: "Usuário não encontrado"
                        });
                    }
                } else {
                    res.status(400).json({
                        message: "Parâmetros inválidos"
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