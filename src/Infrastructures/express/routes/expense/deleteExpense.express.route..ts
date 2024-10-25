import { DeleteExpenseUsecase } from "../../../../usecases/expense/deleteExpense.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from 'express'

export class DeleteExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteExpenseService: DeleteExpenseUsecase
    ){}

    /**
     * @swagger
     * /expense/{id}:
     *   delete:
     *     summary: Deleta uma despesa pelo ID
     *     description: Deleta uma despesa pelo ID.
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
     *         description: Despesa deletada com sucesso
     *       404:
     *         description: Despesa não encontrada
     *       500:
     *         description: Erro interno do servidor
     */

    public static create(deleteExpenseService: DeleteExpenseUsecase) {
        return new DeleteExpenseRoute(
            "/expense/:id",
            HttpMethod.DELETE,
            deleteExpenseService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if (id) {
                    let expense: any = await this.deleteExpenseService.execute({ id });
                    if (expense) {
                        res.status(200).json({
                            message: "Despesa deletada com sucesso"
                        });
                    } else {
                        res.status(404).json({
                            message: "Despesa não encontrada"
                        });
                    }
                } else {
                    res.status(400).json({
                        message: "Parametros inválidos"
                    });
                }
            } catch (error: any) {
                res.status(500).json({
                    message: error.message
                });
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