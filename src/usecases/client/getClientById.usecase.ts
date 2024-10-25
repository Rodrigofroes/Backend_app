import { ClientGateway } from "../../domains/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type GetClientByIdInputDto = {
    id: string;
}

export type GetClientByIdOutputDto = {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone: string;
    userId: string;
}

export class GetClientByIdUsecase implements Usecase<GetClientByIdInputDto, GetClientByIdOutputDto>{
    private constructor(
        private readonly clientGateway: ClientGateway
    ){}

    public static create(clientGateway: ClientGateway){
        return new GetClientByIdUsecase(clientGateway);
    }

    public async execute(input: GetClientByIdInputDto): Promise<GetClientByIdOutputDto> {
        this.validateInput(input);
        const client = await this.clientGateway.getClientById(input.id);

        if(!client){
            throw new Error("Cliente não encontrado");
        }

        let output: GetClientByIdOutputDto = {
            id: client.id,
            name: client.name,
            cpf: client.cpf,
            address: client.address,
            phone: client.phone,
            userId: client.userId
        }

        return output;

    }

    private validateInput(input: GetClientByIdInputDto){
        if(!input.id){
            throw new Error("Parâmetros inválidos");
        }
    }

    
}