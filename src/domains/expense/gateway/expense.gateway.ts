import { Expense } from "../entity/expense.entity";

export interface ExpenseGateway {
    listExpenses(): Promise<Expense[]>;
    createExpense(expense: Expense): Promise<void>;
    getExpenseById(id: string): Promise<Expense>;
    updateExpense(expense: Expense): Promise<boolean>;
    deleteExpense(id: string): Promise<boolean>;
}