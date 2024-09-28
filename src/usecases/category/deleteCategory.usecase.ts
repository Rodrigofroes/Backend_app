import { CategoryGateway } from "../../domains/category/gateway/category.gateway";
import { Usecase } from "../usecase";

export type DeleteCategoryInputDto = {
    id: string;
}

export type DeleteCategoryOutputDto = boolean;

export class DeleteCategoryUsecase implements Usecase<DeleteCategoryInputDto, DeleteCategoryOutputDto> {
    constructor(
        private readonly categoryGateway: CategoryGateway
    ) { }

    public static create(categoryGateway: CategoryGateway) {
        return new DeleteCategoryUsecase(categoryGateway);
    }

    public async execute(input: DeleteCategoryInputDto): Promise<DeleteCategoryOutputDto> {
        this.validateInput(input);

        return await this.categoryGateway.deleteCategory(input.id);
    }

    private validateInput(input: DeleteCategoryInputDto): void {
        if (!input.id) {
            throw new Error("Parametros inválidos");
        }
    }
}