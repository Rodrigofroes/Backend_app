import { Request, Response } from "express";
import { DeleteClientUsecase } from "../../../../usecases/client/deleteClient.usecase";
import { HttpMethod, Route } from "../route";

export class deleteClienteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteClientService: DeleteClientUsecase
    ) { }

    /**
 * @swagger
 * /client/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Client]
 *     description: Remove um cliente com base no ID fornecido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente a ser deletado
 *         example: "123abc"
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente deletado com sucesso"
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


    public static create(deleteClientService: DeleteClientUsecase) {
        return new deleteClienteRoute(
            '/client/:id',
            HttpMethod.DELETE,
            deleteClientService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if (id) {
                    await this.deleteClientService.execute({ id });
                    res.status(200).json({
                        message: "Cliente deletado com sucesso"
                    });
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