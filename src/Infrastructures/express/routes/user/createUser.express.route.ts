import { Request, Response } from "express";
import { CreateUserUsecase } from "../../../../usecases/user/createUser.usecase";
import { HttpMethod, Route } from "../route";

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase
    ) { }

    /**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
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
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "João"
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senhaSegura123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso"
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

    public static create(createUserService: CreateUserUsecase) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { name, email, password } = req.body;
                if (name && email && password) {
                    await this.createUserService.execute({ name, email, password });
                    res.status(201).json({
                        message: "Usuário criado com sucesso"
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
        return false;
    }
}