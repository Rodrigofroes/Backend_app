import { Request, Response } from "express";
import { GetExpenseByIdUsecase } from "../../../../usecases/expense/getExpenseById.usecase";
import { HttpMethod, Route } from "../route";

export class GetExpenseByIdRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getExpenseByIdService: GetExpenseByIdUsecase
    ) { }

    /**
     * @swagger
     * /expense/{id}:
     *   get:
     *     summary: Busca uma despesa pelo ID
     *     description: Busca uma despesa pelo ID.
     *     tags: [Expense]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da despesa
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Despesa encontrada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 expense:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       example: 1
     *                     description:
     *                       type: string
     *                       example: Descrição da despesa
     *                     value:
     *                       type: number
     *                       example: 100.00
     *                     date:
     *                       type: string
     *                       example: 2021-09-01
     *                     category:
     *                       type: string
     *                       example: Alimentação
     *       404:
     *         description: Despesa não encontrada
     *       400:
     *         description: Parametros inválidos
     *       500:
     *         description: Erro interno
     */

    public static create(getExpenseByIdService: GetExpenseByIdUsecase) {
        return new GetExpenseByIdRoute(
            "/expense/:id",
            HttpMethod.GET,
            getExpenseByIdService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { id } = req.params;
                if (id) {
                    const expense = await this.getExpenseByIdService.execute({ id });
                    if (expense) {
                        res.status(200).json({ expense });
                    } else {
                        res.status(404).json({ message: "Despesa não encontrada" });
                    }
                } else {
                    res.status(400).json({ message: "Parametros inválidos" });
                }
            } catch (error: any) {
                res.status(404).json({ message: error.message });
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