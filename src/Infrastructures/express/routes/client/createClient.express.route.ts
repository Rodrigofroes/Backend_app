import { CreateClientUsecase } from "../../../../usecases/client/createClient.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from 'express'

export class CreateClientRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly clientService: CreateClientUsecase
    ) { }

    /**
     * @swagger
     * /create/client:
     *   post:
     *     summary: Cria um novo cliente
     *     tags: [Client]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
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
     *               userId:
     *                 type: string
     *                 description: ID do usuário associado ao cliente
     *                 example: "abc123"
     *     responses:
     *       201:
     *         description: Cliente criado com sucesso
     *       400:
     *         description: Parâmetros inválidos
     *       500:
     *         description: Erro interno no servidor
     *       401:
     *         description: Não autorizado
     */

    public static create(clientService: CreateClientUsecase) {
        return new CreateClientRoute(
            "/create/client",
            HttpMethod.POST,
            clientService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { name, cpf, address, phone, userId } = req.body;
                if (name && cpf && address && phone && userId) {
                    await this.clientService.execute({ name, cpf, address, phone, userId });
                    res.status(201).json({
                        message: "Cliente criado com sucesso"
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