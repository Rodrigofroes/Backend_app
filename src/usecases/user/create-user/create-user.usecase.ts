import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase"

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
    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new CreateUserUsecase(userGateway);
    }

    public async execute({nome, email, senha}: CreateUserInputDto): Promise<CreateUserOutputDto>{
        this.validateUser({nome, email, senha});
        const aEmail = await this.userGateway.findByEmail(email);

        if (aEmail) {
            throw new Error('Email já cadastrado');
        }

        const aUser = User.create(nome, email, senha);

        await this.userGateway.save(aUser);
        
        const output: CreateUserOutputDto = {
            id: aUser.id
        }
    
        return output;
    }

    public validateUser(user: CreateUserInputDto) {
        if (!user.nome) {
            throw new Error('Nome é obrigatório');
        }
        if (!user.email) {
            throw new Error('Email é obrigatório');
        }
        if (!user.senha) {
            throw new Error('Senha é obrigatório');
        }
    }
}