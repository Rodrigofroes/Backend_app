import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindByEmailAndPasswordUserInputDto = {
    email: string;
    senha: string;
}

export type FindByEmailAndPasswordUserOutputDto = void;

export class FindByEmailAndPasswordUsecase implements Usecase<FindByEmailAndPasswordUserInputDto, FindByEmailAndPasswordUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway) { }

    public static create(userGateway: UserGateway) {
        return new FindByEmailAndPasswordUsecase(userGateway);
    }

    public async execute({ email, senha }: FindByEmailAndPasswordUserInputDto): Promise<FindByEmailAndPasswordUserOutputDto> {
        const aUser = await this.userGateway.findByEmailAndPassword(email, senha);
        if (!aUser) {
            throw new Error('Usuário não encontrado!');
        }

        return;
    }
}

