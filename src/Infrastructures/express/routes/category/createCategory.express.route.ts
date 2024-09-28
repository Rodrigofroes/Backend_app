import { Request, Response } from "express";
import { CreateCategoryUsecase } from "../../../../usecases/category/createCategory.usecase";
import { HttpMethod, Route } from "../route";

export class CreateCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createCategoryService: CreateCategoryUsecase
    ) { }

    /**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     security:
 *       - bearerAuth: []
 *     description: Endpoint para criar uma nova categoria fornecendo uma descrição.
 *     tags: [Category]
 *     requestBody:
 *       description: Dados necessários para criar uma categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Categoria de exemplo"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categoria criada com sucesso"
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
 *         description: Erro ao criar categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar categoria"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mensagem de erro detalhada"
 */

    public static create(createCategoryService: CreateCategoryUsecase) {
        return new CreateCategoryRoute(
            "/category",
            HttpMethod.POST,
            createCategoryService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { description } = req.body;
                if (description) {
                    const category = await this.createCategoryService.execute({ description });
                    if (category) {
                        res.status(201).json({ message: "Categoria criada com sucesso" });
                    } else {
                        res.status(404).json({ message: "Erro ao criar categoria" });
                    }
                } else {
                    res.status(400).json({ message: "Parâmetros inválidos" });
                }
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    isProtected(): boolean {
        return true;
    }
}