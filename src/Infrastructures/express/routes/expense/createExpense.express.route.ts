import { Request, Response } from "express";
import { CreateExpenseUsecase } from "../../../../usecases/expense/createExpense.usecase";
import { HttpMethod, Route } from "../route";

export class CreateExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createExpenseService: CreateExpenseUsecase
    ){}


    /**
     * @swagger
     * /expense:
     *   post:
     *     summary: Cria uma despesa
     *     description: Cria uma nova despesa.
     *     tags: [Expense]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
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
     *       201:
     *         description: Despesa criada com sucesso
     *       400:
     *         description: Parametros inválidos
     *       500:
     *         description: Erro interno do servidor
     */

    public static create(createExpenseService: CreateExpenseUsecase){
        return new CreateExpenseRoute(
            "/expense",
            HttpMethod.POST,
            createExpenseService
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { description, value, date, category } = req.body;
                if(description && value && date && category){
                    let consulta = await this.createExpenseService.execute({ description, value, date, category });
                    if(consulta){
                        res.status(201).send({ message: "Despesa criada com sucesso" });
                    } else {
                        res.status(400).send({ message: "Erro ao criar despesa" });
                    }
                } else {
                    res.status(400).send({ message: "Parametros inválidos" });
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