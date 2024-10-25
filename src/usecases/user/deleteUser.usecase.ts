import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type DeleteUserInputDto = {
    id: string;
}

export type DeleteUserOutputDto = boolean;

export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto>{
    private constructor(
        private readonly userGateway: UserGateway
    ){}

    public static create(userGateway: UserGateway){
        return new DeleteUserUsecase(userGateway);
    }

    public async execute(input: DeleteUserInputDto): Promise<DeleteUserOutputDto>{
        this.validadeInput(input);

        const user = await this.userGateway.getUserById(input.id);

        if(!user){
            throw new Error("Usuário não encontrado");
        }
        
       let consulta = await this.userGateway.deleteUser(input.id);

       return consulta;
    }

    private validadeInput(input: DeleteUserInputDto){
        if(!input.id){
            throw new Error("Parâmetros inválidos");
        }
    }
}