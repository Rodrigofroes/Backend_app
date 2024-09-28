import { ExpenseGateway } from "../../domains/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type DeleteExpenseInputDto = {
    id: string;
};

export type DeleteExpenseOutputDto = boolean;

export class DeleteExpenseUsecase implements Usecase<DeleteExpenseInputDto, DeleteExpenseOutputDto> {
    private constructor(
        private readonly expenseGateway: ExpenseGateway
    ) { }

    public static create(expenseGateway: ExpenseGateway) {
        return new DeleteExpenseUsecase(expenseGateway);
    }

    public async execute(input: DeleteExpenseInputDto): Promise<DeleteExpenseOutputDto> {
        this.validateInput(input);

        let expense = await this.expenseGateway.getExpenseById(input.id);

        if (!expense) {
            throw new Error("Despesa não encontrada");
        }

        return await this.expenseGateway.deleteExpense(input.id);  
    }

    private validateInput(input: DeleteExpenseInputDto) {
        if (!input.id) {
            throw new Error("Parâmetros inválidos");
        }
    }
}