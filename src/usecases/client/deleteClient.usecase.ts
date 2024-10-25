import { ClientGateway } from "../../domains/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type DeleteClientInputDto = {
    id: string;
}

export type DeleteClientOutputDto = void;

export class DeleteClientUsecase implements Usecase<DeleteClientInputDto, DeleteClientOutputDto>{
    private constructor(
        private readonly clientGateway: ClientGateway
    ){}

    public static create(clientGateway: ClientGateway){
        return new DeleteClientUsecase(clientGateway);
    }

    public async execute(input: DeleteClientInputDto): Promise<DeleteClientOutputDto> {
        this.validateInput(input);
        const client = await this.clientGateway.getClientById(input.id);

        if(!client){
            throw new Error("Cliente não encontrado");
        }

        await this.clientGateway.deleteClient(input.id);

    }

    private validateInput(input: DeleteClientInputDto){
        if(!input.id){
            throw new Error("Parâmetros inválidos");
        }
    }
}