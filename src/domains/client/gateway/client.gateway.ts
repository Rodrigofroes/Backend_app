import { Client } from "../entity/client.entity";

export interface ClientGateway {
    createClient(client: Client): Promise<void>;
    getClientById(id: string): Promise<Client | null>;
    getClients(): Promise<Client[]>;
    getClientByCpf(cpf: string): Promise<Client | null>;
    updateClient(client: Client): Promise<void>;
    deleteClient(id: string): Promise<Number | null>;
}