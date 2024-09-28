import { User } from "../../domains/user/entity/user.entity";
import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type UpdateUserInputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type UpdateUserOutputDto = void;

export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway
    ) { }

    public static create(userGateway: UserGateway) {
        return new UpdateUserUsecase(userGateway);
    }

    public async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
        this.validadeInput(input);

        let aUser = await this.userGateway.getUserById(input.id);

        if(!aUser){
            throw new Error("Usuário não encontrado");
        }

        const user = User.with({
            id: input.id,
            name: input.name,
            email: input.email,
            password: await User.encryptPassword(input.password)
        })

        await this.userGateway.updateUser(user);

        return;
    }

    private validadeInput(input: UpdateUserInputDto) {
        if (!input.id || !input.name || !input.email || !input.password) {
            throw new Error("Parâmetros inválidos");
        }
    }
}