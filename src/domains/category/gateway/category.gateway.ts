import { Category } from "../entity/category.entity";

export interface CategoryGateway {
    createCategory(category: Category): Promise<void>;
    listCategory(): Promise<Category[]>;
    deleteCategory(id: string): Promise<boolean>;
}