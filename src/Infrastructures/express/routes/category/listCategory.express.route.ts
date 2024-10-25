import { Request, Response } from "express";
import { ListCategoryUsecase } from "../../../../usecases/category/listCategory.usecase";
import { HttpMethod, Route } from "../route";

export class ListCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listCategoryService: ListCategoryUsecase
    ) { }

    /**
 * @swagger
 * /category:
 *   get:
 *     summary: Lista todas as categorias
 *     security:
 *       - bearerAuth: []
 *     description: Retorna uma lista de todas as categorias cadastradas.
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Nenhuma categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categorias não encontradas"
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

    public static create(listCategoryService: ListCategoryUsecase) {
        return new ListCategoryRoute(
            '/category',
            HttpMethod.GET,
            listCategoryService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const categories = await this.listCategoryService.execute();
                if (categories) {
                    res.status(200).send(categories);
                } else {
                    res.status(404).send({ message: "Categorias não encontradas" });
                }
            } catch (error: any) {
                res.status(500).send({ message: error.message });
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