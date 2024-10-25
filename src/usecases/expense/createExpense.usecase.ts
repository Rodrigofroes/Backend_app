import { Expense } from "../../domains/expense/entity/expense.entity";
import { ExpenseGateway } from "../../domains/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type CreateExpenseInputDto = {
    description: string;
    value: number;
    date: Date;
    category: string;
};

export type CreateExpenseOutputDto = void | null;

export class CreateExpenseUsecase implements Usecase<CreateExpenseInputDto, CreateExpenseOutputDto>{
    private constructor(
        private readonly expenseGateway: ExpenseGateway
    ){}

    public static create(expenseGateway: ExpenseGateway){
        return new CreateExpenseUsecase(expenseGateway);
    }

    public async execute(input: CreateExpenseInputDto): Promise<CreateExpenseOutputDto>{
        this.validateInput(input);

        let expense = Expense.create(
            input.description,
            input.value,
            input.date,
            input.category
        );

        return await this.expenseGateway.createExpense(expense);
    }
    
    private validateInput(input: CreateExpenseInputDto){
        if(!input.description || !input.value || !input.date || !input.category){
            throw new Error("Parametros inválidos");
        }
    }
}