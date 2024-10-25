import { ClientGateway } from "../../domains/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type GetClientsInputDto = void;

export type GetClientsOutputDto = {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone: string;
    userId: string;
}[];

export class GetClientsUsecase implements Usecase<GetClientsInputDto, GetClientsOutputDto> {
    private constructor(
        private readonly clientGateway: ClientGateway
    ) {}

    public static create(clientGateway: ClientGateway): GetClientsUsecase {
        return new GetClientsUsecase(clientGateway);
    }

    public async execute(): Promise<GetClientsOutputDto> {
        try {
            const clients = await this.clientGateway.getClients();

            const output: GetClientsOutputDto = clients.map(client => ({
                id: client.id,
                name: client.name,
                cpf: client.cpf,
                address: client.address,
                phone: client.phone,
                userId: client.userId
            }));

            return output;

        } catch (error) {
            console.error("Error fetching clients:", error);
            throw new Error("Unable to fetch clients at this time.");
        }
    }
}
