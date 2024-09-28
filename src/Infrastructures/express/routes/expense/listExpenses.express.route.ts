import { Request, Response } from "express";
import { ListExpensesUsecase } from "../../../../usecases/expense/listExpenses.usecase";
import { HttpMethod, Route } from "../route";

export class ListExpensesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly ListExpensesService: ListExpensesUsecase
    ) { }

    /**
 * @swagger
 * /expense:
 *   get:
 *     summary: Lista todas as despesas
 *     description: Retorna uma lista de todas as despesas registradas.
 *     tags: [Expense]
 *     responses:
 *       200:
 *         description: Lista de despesas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Nenhuma despesa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Despesas não encontradas
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mensagem de erro detalhada
 */

    public static create(ListExpensesService: ListExpensesUsecase) {
        return new ListExpensesRoute(
            "/expense",
            HttpMethod.GET,
            ListExpensesService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const expenses = await this.ListExpensesService.execute();
                if (expenses) {
                    res.status(200).json(expenses);
                } else {
                    res.status(404).json({
                        message: "Despesas não encontradas"
                    });
                }
            } catch (error: any) {
                res.status(500).json({
                    message: error.message
                });
            }
        };
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    isProtected(): boolean {
        return false;
    }
}