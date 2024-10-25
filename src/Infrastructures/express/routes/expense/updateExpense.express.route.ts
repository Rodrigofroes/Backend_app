import { UpdateExpenseUsecase } from "../../../../usecases/expense/updateExpense.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from 'express';

export class UpdateExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateExpenseService: UpdateExpenseUsecase
    ){}

    /**
     * @swagger
     * /expense:
     *   put:
     *     summary: Atualiza uma despesa pelo ID
     *     description: Atualiza uma despesa pelo ID.
     *     tags: [Expense]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 description: ID da despesa
     *                 example: "123abc"
     *               description:
     *                 type: string
     *                 example: Descrição da despesa
     *               value:
     *                 type: number
     *                 example: 100.00
     *               date:
     *                 type: string
     *                 example: 2021-09-01
     *               category:
     *                 type: string
     *                 example: Alimentação
     *     responses:
     *       200:
     *         description: Despesa atualizada com sucesso
     *       404:
     *         description: Despesa não encontrada
     *       500:
     *         description: Erro interno do servidor
     */

    public static create(updateExpenseService: UpdateExpenseUsecase){
        return new UpdateExpenseRoute(
            "/expense/:id",
            HttpMethod.PUT,
            updateExpenseService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const {id,  description, value, date, category } = req.body;
                if (id && description && value && date && category) {
                    let expense: any = await this.updateExpenseService.execute({ id, description, value, date, category });
                    if (expense) {
                        res.status(200).json({
                            message: "Despesa atualizada com sucesso"
                        });
                    } else {
                        res.status(404).json({
                            message: "Despesa não encontrada"
                        });
                    }
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
        return true;
    }
}