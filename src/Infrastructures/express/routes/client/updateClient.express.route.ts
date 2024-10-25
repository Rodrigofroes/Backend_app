import { UpdateClientUsecase } from "../../../../usecases/client/updateClient.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from 'express'

export class UpdateClientRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateClientService: UpdateClientUsecase
    ) { }

    /**
 * @swagger
 * /client:
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Client]
 *     description: Atualiza as informações de um cliente com base no ID fornecido.
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
 *                 description: ID do cliente
 *                 example: "123abc"
 *               name:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: "João Silva"
 *               cpf:
 *                 type: string
 *                 description: CPF do cliente
 *                 example: "123.456.789-00"
 *               address:
 *                 type: string
 *                 description: Endereço do cliente
 *                 example: "Rua Exemplo, 123"
 *               phone:
 *                 type: string
 *                 description: Telefone do cliente
 *                 example: "(11) 99999-9999"
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno no servidor
 */


    public static create(updateClientService: UpdateClientUsecase) {
        return new UpdateClientRoute(
            '/client',
            HttpMethod.PUT,
            updateClientService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id, name, cpf, address, phone } = req.body;
                if (id && name && cpf && address && phone) {
                    await this.updateClientService.execute({ id, name, cpf, address, phone });
                    res.status(200).json({
                        message: "Cliente atualizado com sucesso"
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