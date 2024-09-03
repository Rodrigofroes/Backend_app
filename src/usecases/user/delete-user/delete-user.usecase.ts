import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type DeleteUserInputDto = {
    id: string;
}

export type DeleteUserOutputDto = void;

export class DeleteUserUsercase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto>{
    private constructor(private readonly useGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new DeleteUserUsercase(userGateway);
    }

    public async execute(input: DeleteUserInputDto): Promise<void> {
        const aUser = this.useGateway.findById(input.id);
        if (!aUser) {
            throw new Error('Usuário não encontrado');
        }

        await this.useGateway.delete(input.id);
        return;
    }
}