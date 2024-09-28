import { User } from "../../domains/user/entity/user.entity";
import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type GetUserByIdInputDto = {
    id: string;
}

export type GetUserByIdOutputDto = User | null;

export class GetUserByIdUsecase implements Usecase<GetUserByIdInputDto, GetUserByIdOutputDto>{
    private constructor(
        private readonly userGateway: UserGateway
    ){}

    public static create(userGateway: UserGateway){
        return new GetUserByIdUsecase(userGateway);
    }

    public async execute(input: GetUserByIdInputDto): Promise<GetUserByIdOutputDto>{
        this.validadeInput(input);

        const user = await this.userGateway.getUserById(input.id);

        if(!user){
            throw new Error("Usuário não encontrado");
        }

        return user;
    }

    private validadeInput(input: GetUserByIdInputDto){
        if(!input.id){
            throw new Error("Parâmetros inválidos");
        }
    }
}