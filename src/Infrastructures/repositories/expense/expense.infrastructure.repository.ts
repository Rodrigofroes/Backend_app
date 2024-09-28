import { Database } from "../../../db/database";
import { Expense } from "../../../domains/expense/entity/expense.entity";
import { ExpenseGateway } from "../../../domains/expense/gateway/expense.gateway";

export class ExpenseRepository implements ExpenseGateway{
    private constructor(
        private readonly banco: Database
    ){}

    public static create(banco: Database){
        return new ExpenseRepository(banco);
    }

    public async getExpenseById(id: string): Promise<Expense> {
        let sql = "SELECT * FROM tb_expense INNER JOIN tb_category ON tb_expense.category_id = tb_category.category_id WHERE expense_id = $1";
        let valores = [id];
        let resultado = await this.banco.ExecutaComando(sql, valores);

        return resultado;
    }

    public async createExpense(expense: any): Promise<void> {
        let sql = "INSERT INTO tb_expense (expense_id, expense_description, expense_value, expense_date, category_id) VALUES ($1, $2, $3, $4, $5)";
        let valores = [expense.id, expense.description, expense.value, expense.date, expense.category];

        return await this.banco.ExecutaComandoNoQuery(sql, valores);
    }

    public async updateExpense(expense: any): Promise<boolean> {
        let sql = "UPDATE tb_expense SET expense_description = $1, expense_value = $2, expense_date = $3, category_id = $4 WHERE expense_id = $5";
        let valores = [expense.description, expense.value, expense.date, expense.category, expense.id];

        let resultado = await this.banco.ExecutaComandoNoQuery(sql, valores);

        return resultado.rowCount > 0 ? true : false;
    }

    public async deleteExpense(id: string): Promise<boolean> {
        let sql = "DELETE FROM tb_expense WHERE expense_id = $1";
        let valores = [id];

        let resultado = await this.banco.ExecutaComandoNoQuery(sql, valores);
        return resultado;
    }

    public async listExpenses(): Promise<Expense[]> {
        let sql = "SELECT * FROM tb_expense INNER JOIN tb_category ON tb_expense.category_id = tb_category.category_id";
        let resultado = await this.banco.ExecutaComando(sql, []);

        return resultado;
    }
}