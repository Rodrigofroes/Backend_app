import { CategoryGateway } from "../../domains/category/gateway/category.gateway";
import { Usecase } from "../usecase";

export type ListCategoryInputDto = void;

export type ListCategoryOutputDto = {
    id: string;
    description: string;
}[];

export class ListCategoryUsecase implements Usecase<ListCategoryInputDto, ListCategoryOutputDto> {
    private constructor(
        private readonly categoryGateway: CategoryGateway
    ) { }

    public static create(categoryGateway: CategoryGateway) {
        return new ListCategoryUsecase(categoryGateway);
    }

    public async execute(): Promise<ListCategoryOutputDto> {
        let category = await this.categoryGateway.listCategory();

        return this.ToMAP(category);
    }

    private ToMAP(category: any): ListCategoryOutputDto {
        return category.map((category: any) => {
            return {
                id: category.category_id,
                description: category.category_description
            }
        });
    }
}
