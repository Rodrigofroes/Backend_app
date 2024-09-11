import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { AuthRepository } from "../../../infra/respositories/user/auth";
import { Usecase } from "../../usecase";

export type FindByEmailAndPasswordUserInputDto = {
    email: string;
    senha: string;
}

export type FindByEmailAndPasswordUserOutputDto = {
    token: string;
};

export class FindByEmailAndPasswordUsecase implements Usecase<FindByEmailAndPasswordUserInputDto, FindByEmailAndPasswordUserOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway,
        private readonly authRepository: AuthRepository
    ) {}

    public static create(userGateway: UserGateway, authRepository: AuthRepository): FindByEmailAndPasswordUsecase {
        return new FindByEmailAndPasswordUsecase(userGateway, authRepository);
    }

    public async execute({ email, senha }: FindByEmailAndPasswordUserInputDto): Promise<FindByEmailAndPasswordUserOutputDto> {
        const aUser = await this.userGateway.findByEmailAndPassword(email, senha);
        if (!aUser) {
            throw new Error('Usuário não encontrado!');
        }

        const token = this.authRepository.gerarToken(aUser);

        return { token };
    }
}

