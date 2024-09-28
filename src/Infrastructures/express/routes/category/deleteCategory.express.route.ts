import { Request, Response } from "express";
import { DeleteCategoryUsecase } from "../../../../usecases/category/deleteCategory.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteCategoryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteCategoryService: DeleteCategoryUsecase
    ) { }

    /**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Deleta uma categoria existente
 *     security:
 *       - bearerAuth: []
 *     description: Remove uma categoria com base no ID fornecido.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Categoria deletada com sucesso"
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
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categoria não encontrada"
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

    public static create(deleteCategoryService: DeleteCategoryUsecase) {
        return new DeleteCategoryRoute(
            '/category/:id',
            HttpMethod.DELETE,
            deleteCategoryService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if (id) {
                    let consulta = await this.deleteCategoryService.execute({ id });
                    if (consulta) {
                        res.status(200).send({ message: "Categoria deletada com sucesso" });
                    } else {
                        res.status(404).send({ message: "Categoria não encontrada" });
                    }

                }else {
                    res.status(400).send({ message: "Parâmetros inválidos" });
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