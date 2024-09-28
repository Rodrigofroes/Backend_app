import { Category } from "../../domains/category/entity/category.entity";
import { CategoryGateway } from "../../domains/category/gateway/category.gateway";
import { Usecase } from "../usecase";

export type CreateCategoryInputDto = {
    description: string;
}

export type CreateCategoryOutputDto = void | null;

export class CreateCategoryUsecase implements Usecase<CreateCategoryInputDto, CreateCategoryOutputDto> {
    private constructor(
        private readonly categoryGateway: CategoryGateway
    ) { }

    public static create(categoryGateway: CategoryGateway) {
        return new CreateCategoryUsecase(categoryGateway);
    }

    public async execute(input: CreateCategoryInputDto): Promise<CreateCategoryOutputDto> {
        this.validateInput(input);

        const category = Category.create(
            input.description
        );

        return await this.categoryGateway.createCategory(category);
    }

    private validateInput(input: CreateCategoryInputDto): void {
        if (!input.description) {
            throw new Error("Parametros inválidos");
        }
    }
}