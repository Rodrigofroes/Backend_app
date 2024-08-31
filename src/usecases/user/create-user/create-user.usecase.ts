import { User } from "../../../domain/user/entity/user.entity";
import { UserGataway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usercase"

// Para ciiar um novo usuário, é necessário informar o nome, email e senha
export type CreateUserInputDto = {
    nome: string;
    email: string;
    senha: string;
}

// Ao criar um usuário, o sistema deve retornar o id do usuário criado
export type CreateUserOutputDto = {
    id: string;
}

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
    private constructor(private readonly userGateway: UserGataway){}

    public static create(userGateway: UserGataway){
        return new CreateUserUsecase(userGateway);
    }

    public async execute({nome, email, senha}: CreateUserInputDto): Promise<CreateUserOutputDto>{
        const aUser = User.create(nome, email, senha);
        await this.userGateway.save(aUser);
    
        const output: CreateUserOutputDto = {
            id: aUser.id
        }
    
        return output;
    }
}