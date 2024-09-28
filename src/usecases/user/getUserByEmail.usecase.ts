import { User } from "../../domains/user/entity/user.entity";
import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type GetUserByEmailInputDto = {
    email: string;
}

export type GetUserByEmailOutputDto = User | null;

export class GetUserByEmailUsecase implements Usecase<GetUserByEmailInputDto, GetUserByEmailOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway
    ) { };

    public static create(userGateway: UserGateway) {
        return new GetUserByEmailUsecase(userGateway);
    }

    public async execute(input: GetUserByEmailInputDto): Promise<GetUserByEmailOutputDto> {
        this.validadeInput(input);

        const user = await this.userGateway.getUserByEmail(input.email);

        if(!user){
            throw new Error("Usuário não encontrado");
        }

        return user;
    }

    private validadeInput(input: GetUserByEmailInputDto) {
        if (!input.email) {
            throw new Error("Parâmetros inválidos");
        }
    }
}