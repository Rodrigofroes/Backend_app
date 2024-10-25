import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type GetUserByIdInputDto = {
    id: string;
}

export type GetUserByIdOutputDto = {
    id: string,
    name: string,
    email: string
};

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

        return this.toMap(user);
    }

    private validadeInput(input: GetUserByIdInputDto){
        if(!input.id){
            throw new Error("Parâmetros inválidos");
        }
    }

    private toMap(user: any): GetUserByIdOutputDto {  
       let resultado = user.map((x: any) => {
            return {
                id: x.user_id,
                name: x.user_name,
                email: x.user_email
            };
        });
        return resultado;
    }
}