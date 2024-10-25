import { Client } from "../../domains/client/entity/client.entity";
import { ClientGateway } from "../../domains/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type UpdateClientInputDto = {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone: string;
}

export type UpdateClientOutputDto = void;

export class UpdateClientUsecase implements Usecase<UpdateClientInputDto, UpdateClientOutputDto>{
    private constructor(
        private readonly clientGateway: ClientGateway
    ){}

    public static create(clientGateway: ClientGateway){
        return new UpdateClientUsecase(clientGateway);
    }

    public async execute(input: UpdateClientInputDto): Promise<UpdateClientOutputDto> {
        this.validateInput(input);
        const client = await this.clientGateway.getClientById(input.id);

        if(!client){
            throw new Error("Cliente não encontrado");
        }

        let updatedClient = Client.with({
            id: input.id,
            name: input.name,
            cpf: input.cpf,
            address: input.address,
            phone: input.phone,
            userId: client.userId
        });

        await this.clientGateway.updateClient(updatedClient);

    }

    private validateInput(input: UpdateClientInputDto){
        if(!input.id || !input.name || !input.cpf || !input.address || !input.phone){
            throw new Error("Parâmetros inválidos");
        }
    }

    
}