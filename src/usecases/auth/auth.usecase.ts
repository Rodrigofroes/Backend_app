import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { AuthMiddleware } from "../../Infrastructures/express/middlewares/authMiddleware";
import { Usecase } from "../usecase";
import bcrypt from 'bcrypt';

export type AuthInputDto = {
    email: string,
    password: string
};

export type AuthOutputDto = string;

export class AuthUsecase implements Usecase<AuthInputDto, AuthOutputDto>{
    private constructor(
        private readonly useGateway: UserGateway,
        private readonly authService: AuthMiddleware
    ){}

    public static create(useGateway: UserGateway, authService: AuthMiddleware){
        return new AuthUsecase(useGateway, authService);
    }

    public async execute(input: AuthInputDto): Promise<AuthOutputDto>{
        this.validadeInput(input);

        const aUser = await this.useGateway.getUserByEmail(input.email);

        if(!aUser){
            throw new Error("Usuário não encontrado");
        }

        const isPasswordValid = await bcrypt.compare(input.password, aUser.password);

        if (!isPasswordValid) {
            throw new Error("Usuário e/ou senha inválidos");
        }

        return this.authService.gerarToken(aUser.id, aUser.name, aUser.email);

    }

    private validadeInput(input: AuthInputDto){
        if(!input.email || !input.password){
            throw new Error("Parâmetros inválidos");
        }
    }
    
}