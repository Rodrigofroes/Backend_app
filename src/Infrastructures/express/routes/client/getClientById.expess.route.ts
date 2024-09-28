import { GetClientByIdUsecase } from "../../../../usecases/client/getClientById.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetClientByIdRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getClientByIdService: GetClientByIdUsecase
    ) { }

    /**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Busca cliente pelo ID
 *     tags: [Client]
 *     description: Retorna os dados de um cliente com base no ID fornecido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente a ser buscado
 *         example: "123abc"
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do cliente
 *                   example: "123abc"
 *                 name:
 *                   type: string
 *                   description: Nome do cliente
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   description: E-mail do cliente
 *                   example: "joao.silva@email.com"
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
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente não encontrado"
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


    public static create(getClientByIdService: GetClientByIdUsecase) {
        return new GetClientByIdRoute(
            "/client/:id",
            HttpMethod.GET,
            getClientByIdService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if (id) {
                    const client = await this.getClientByIdService.execute({ id });
                    if (client) {
                        res.status(200).json(client);
                    } else {
                        res.status(404).json({
                            message: "Cliente não encontrado"
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
        };
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