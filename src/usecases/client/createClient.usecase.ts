
import { Client } from "../../domains/client/entity/client.entity";
import { ClientGateway } from "../../domains/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type CreateClientInputDto = {
    name: string,
    cpf: string,
    address: string,
    phone: string,
    userId: string
}

export type CreateClientOutputDto = void;

export class CreateClientUsecase implements Usecase<CreateClientInputDto, CreateClientOutputDto> {
    private constructor(
        private readonly clientGateway: ClientGateway
    ) { }

    public static create(clientGateway: ClientGateway) {
        return new CreateClientUsecase(clientGateway);
    }

    public async execute(input: CreateClientInputDto): Promise<CreateClientOutputDto> {
        this.validadeInput(input);

        const aClient = await this.clientGateway.getClientByCpf(input.cpf);

        if (aClient) {
            throw new Error("CPF já cadastrado");
        }

        const client = Client.create(
            input.name,
            input.cpf,
            input.address,
            input.phone,
            input.userId
        );
        
        await this.clientGateway.createClient(client);

        return;
    }

    private validadeInput(input: CreateClientInputDto) {
        if (!input.name || !input.cpf || !input.address || !input.phone || !input.userId) {
            throw new Error("Parâmetros inválidos");
        }
    }
}