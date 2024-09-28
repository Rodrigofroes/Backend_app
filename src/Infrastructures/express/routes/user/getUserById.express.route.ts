import { Request, Response } from "express";
import { GetUserByIdUsecase } from "../../../../usecases/user/getUserById.usecase";
import { HttpMethod, Route } from "../route";

export class GetUserByIdRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getUserByIdService: GetUserByIdUsecase
    ) { }

    /**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna os detalhes de um usuário pelo ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser consultado
 *     responses:
 *       200:
 *         description: Detalhes do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@example.com"
 *                 address:
 *                   type: string
 *                   example: "Rua Exemplo, 123"
 *                 phone:
 *                   type: string
 *                   example: "(11) 99999-9999"
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

    public static create(getUserByIdService: GetUserByIdUsecase) {
        return new GetUserByIdRoute(
            "/user/:id",
            HttpMethod.GET,
            getUserByIdService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { id } = req.params;
                if (id) {
                    let user: any = await this.getUserByIdService.execute({ id });
                    if (user) {
                        res.status(200).json(user);
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