import { GetClientsUsecase } from "../../../../usecases/client/getClients.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetClientsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getClientsService: GetClientsUsecase
    ) { }

 /**
 * @swagger
 * /client:
 *   get:
 *     summary: Busca todos os clientes
 *     tags: [Client]
 *     description: Retorna uma lista de todos os clientes cadastrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do cliente
 *                     example: "123abc"
 *                   name:
 *                     type: string
 *                     description: Nome do cliente
 *                     example: "João Silva"
 *                   cpf:
 *                     type: string
 *                     description: CPF do cliente
 *                     example: "123.456.789-00"
 *                   address:
 *                     type: string
 *                     description: Endereço do cliente
 *                     example: "Rua Exemplo, 123"
 *                   phone:
 *                     type: string
 *                     description: Telefone do cliente
 *                     example: "+55 11 99999-8888"
 *                   userId:
 *                     type: string
 *                     description: ID do usuário associado ao cliente
 *                     example: "user123"
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Nenhum cliente encontrado
 *       500:
 *         description: Erro interno no servidor
 */



    public static create(getClientsService: GetClientsUsecase) {
        return new GetClientsRoute(
            "/client",
            HttpMethod.GET,
            getClientsService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {

                const client = await this.getClientsService.execute();
                if (client) {
                    res.status(200).json(client);
                } else {
                    res.status(404).json({
                        message: "Cliente não encontrado"
                    });
                }
            }
            catch (error: any) {
                res.status(500).json({
                    message: error.message
                });

            };
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