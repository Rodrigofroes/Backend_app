import { AuthGateway } from "../../infra/middleware/gateway/authGateway";
import { Usecase } from "../usecase";

export type AuthInputDto = {
    email: string;
    senha: string;
}

export type AuthOutputDto = string;

export class AuthUsecase implements Usecase<AuthInputDto, AuthOutputDto> {
    private constructor(private readonly authGateway: AuthGateway) { }

    public static create(authGateway: AuthGateway) {
        return new AuthUsecase(authGateway);
    }

    public async execute(input: AuthInputDto): Promise<AuthOutputDto> {
        this.validateInput(input);
        const token = await this.authGateway.login(input.email, input.senha);
        return token;
    }

    public validateInput(input: AuthInputDto) {
        if (!input.email) {
            throw new Error('E-mail é obrigatório!');
        }
        if (!input.senha) {
            throw new Error('Senha é obrigatório!');
        }
    }
}