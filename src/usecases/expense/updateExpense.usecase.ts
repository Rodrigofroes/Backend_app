import { Expense } from "../../domains/expense/entity/expense.entity";
import { ExpenseGateway } from "../../domains/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type UpdateExpenseInputDto = {
    id: string;
    description: string;
    value: number;
    date: Date;
    category: string;
};

export type UpdateExpenseOutputDto = boolean;

export class UpdateExpenseUsecase implements Usecase<UpdateExpenseInputDto, UpdateExpenseOutputDto> {
    private constructor(
        private readonly expenseGateway: ExpenseGateway
    ) { }

    public static create(expenseGateway: ExpenseGateway) {
        return new UpdateExpenseUsecase(expenseGateway);
    }

    public async execute(input: UpdateExpenseInputDto): Promise<UpdateExpenseOutputDto> {
        this.validateInput(input);

        let expense = Expense.with({
            id: input.id,
            description: input.description,
            value: input.value,
            date: input.date,
            category: input.category
        });

        return await this.expenseGateway.updateExpense(expense);
    }

    private validateInput(input: UpdateExpenseInputDto) {
        if (!input.id || !input.description || !input.value || !input.date || !input.category) {
            throw new Error("Parametros inválidos");
        }
    }
}