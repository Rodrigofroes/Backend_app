import { AuthInterface } from "../../infra/authentic/interface/authentic.interface";
import { Usecase } from "../usecase";

export type AuthenticInputDto = {
    email: string;
    senha: string;
}

export type AuthenticOutputDto = {
    token: string;
}

export class AuthenticUseCase implements Usecase<AuthenticInputDto, AuthenticOutputDto>{
    constructor(private readonly authenticRepository: AuthInterface) { }

    async execute(input: AuthenticInputDto): Promise<AuthenticOutputDto> {
        const aUser = this.authenticRepository.login(input.email, input.senha);
        if (!aUser) throw new Error('Usuário não encontrado');

        const token = this.authenticRepository.gerarToken(aUser);
        return { token };
    }
}