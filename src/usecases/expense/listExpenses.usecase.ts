import { Expense } from "../../domains/expense/entity/expense.entity";
import { ExpenseGateway } from "../../domains/expense/gateway/expense.gateway";
import { Usecase } from "../usecase";

export type ListExpensesInputDto = void;

export type ListExpensesOutputDto = {
  id: string;
  description: string;
  value: number;
  date: Date;
  category: string;
}[];

export class ListExpensesUsecase implements Usecase<ListExpensesInputDto, ListExpensesOutputDto>{
    private constructor(
        private readonly expenseGateway: ExpenseGateway
    ){};

    public static create(expenseGateway: ExpenseGateway){
        return new ListExpensesUsecase(expenseGateway);
    }

    public async execute(): Promise<ListExpensesOutputDto>{
        const expenses = await this.expenseGateway.listExpenses();

        return this.ToMAP(expenses);
    }

    private ToMAP(expenses: Expense[]): ListExpensesOutputDto{
        let lista = expenses.map((expense: any) => {
            return {
                id: expense.expense_id,
                description: expense.expense_description,
                value: expense.expense_value,
                date: expense.expense_date,
                category: expense.category_description
            }
        });
        return lista;
    }
}
