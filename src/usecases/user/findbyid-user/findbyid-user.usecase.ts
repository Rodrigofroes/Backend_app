import { UserGataway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindByIdInputDto = {
    id: string;
}

export type FindByIdOutputDto = {
    id: string;
    nome: string;
    email: string;
}

export class FindByIdUsercase implements Usecase<FindByIdInputDto, FindByIdOutputDto>{
    constructor(private readonly userGateway: UserGataway){}

    public static create(userGateway: UserGataway){
        return new FindByIdUsercase(userGateway);
    }

    public async execute(input: FindByIdInputDto): Promise<FindByIdOutputDto> {
        const aUser = await this.userGateway.findById(input.id);
        if (!aUser) {
            throw new Error('Usuário não encontrado');
        }

        const output: FindByIdOutputDto = {
            id: aUser.id,
            nome: aUser.nome,
            email: aUser.email
        }

        return output;
    }
}