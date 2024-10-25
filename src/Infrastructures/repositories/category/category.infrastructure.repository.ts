import { Database } from "../../../db/database";
import { Category } from "../../../domains/category/entity/category.entity";
import { CategoryGateway } from "../../../domains/category/gateway/category.gateway";

export class CategoryRepository implements CategoryGateway {
    private constructor(
        private readonly banco: Database
    ) { }

    public static create(banco: Database){
        return new CategoryRepository(banco);
    }

    async createCategory(category: Category): Promise<void> {
        let sql = "INSERT INTO tb_category (category_id, category_description) VALUES ($1, $2)";
        let valores = [category.id, category.description];

        return this.banco.ExecutaComandoNoQuery(sql, valores);
    }

    async listCategory(): Promise<Category[]> {
        let sql = "SELECT * FROM tb_category";
        return this.banco.ExecutaComando(sql, []);
    }

    async deleteCategory(id: string): Promise<boolean> {
        let sql = "DELETE FROM tb_category WHERE category_id = $1";
        let valores = [id];

        let result = await this.banco.ExecutaComandoNoQuery(sql, valores);

        return result.rowCount > 0 ? true : false;
    }
}