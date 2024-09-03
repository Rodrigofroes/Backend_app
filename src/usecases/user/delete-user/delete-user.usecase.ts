import { UserGataway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type DeleteUserInputDto = {
    id: string;
}

export type DeleteUserOutputDto = void;

export class DeleteUserUsercase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto>{
    constructor(private readonly useGateway: UserGataway){}

    public static create(userGateway: UserGataway){
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