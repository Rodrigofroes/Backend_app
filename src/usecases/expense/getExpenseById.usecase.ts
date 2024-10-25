import { ExpenseGateway } from "../../domains/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type GetExpenseByIdInputDto = {
    id: string;
}

export type GetExpenseByIdOutputDto = {
    id: string;
    description: string;
    value: number;
    date: Date;
    category: string;
};

export class GetExpenseByIdUsecase implements Usecase<GetExpenseByIdInputDto, GetExpenseByIdOutputDto> {
    private constructor(
        private readonly expenseGateway: ExpenseGateway
    ) { }

    public static create(expenseGateway: ExpenseGateway) {
        return new GetExpenseByIdUsecase(expenseGateway);
    }

    public async execute(input: GetExpenseByIdInputDto): Promise<GetExpenseByIdOutputDto> {
        this.validateInput(input);

        let expense = await this.expenseGateway.getExpenseById(input.id);

        if (!expense) {
            throw new Error("Despesa não encontrada");
        }

        return this.toMAP(expense);
    }

    private validateInput(input: GetExpenseByIdInputDto) {
        if (!input.id) {
            throw new Error("Parametros inválidos");
        }
    }

    private toMAP(expense: any): GetExpenseByIdOutputDto {
        let lista = expense.map((x: any) => {
            return {
                id: x.expense_id,
                description: x.expense_description,
                value: x.expense_value,
                date: x.expense_date,
                category: x.category_description
            }
        });
        return lista;
    }

}