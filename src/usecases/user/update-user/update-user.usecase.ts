import { UserGataway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";
import { User } from "../../../domain/user/entity/user.entity";

export type UpdateUserInputDto = {
    id: string;
    nome: string;
    email: string;
    senha: string;
}

export type UpdateUserOutputDto = {
    id: string;
}

export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
    private constructor(private readonly useGateway: UserGataway) { }

    public static create(useGateway: UserGataway) {
        return new UpdateUserUsecase(useGateway);
    }

    public async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
        const aUser = this.useGateway.findById(input.id);
        if (!aUser) {
            throw new Error('Usuário não encontrado');
        }

        this.validateUser(input);

        const user: User = User.with ({
            id: input.id,
            nome: input.nome,
            email: input.email,
            senha: input.senha
        })

        await this.useGateway.update(user);

        const output: UpdateUserOutputDto = {
            id: user.id
        }

        return output;
    }

    public validateUser(user: UpdateUserInputDto) {
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