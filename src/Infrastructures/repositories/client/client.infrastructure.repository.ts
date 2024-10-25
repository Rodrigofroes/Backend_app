import { Database } from "../../../db/database";
import { ClientGateway } from "../../../domains/client/gateway/client.gateway";

export class ClientRepository implements ClientGateway {
    private constructor(
        private readonly banco: Database
    ) { }

    public static create(banco: Database) {
        return new ClientRepository(banco);
    }

    public async createClient(client: any): Promise<void> {
        let sql = "INSERT INTO tb_client (client_id, client_name, client_cpf, client_address, client_phone, user_id) VALUES ($1, $2, $3, $4, $5, $6)";
        let valores = [client.id, client.name, client.cpf, client.address, client.phone, client.userId];

        await this.banco.ExecutaComandoNoQuery(sql, valores);
    }

    public async getClientByCpf(cpf: string): Promise<any> {
        let sql = "SELECT * FROM tb_client WHERE client_cpf = $1 AND client_active = true";
        let valores = [cpf];
        let resultado = await this.banco.ExecutaComando(sql, valores);

        return this.toMAP(resultado[0]);
    }

    public async getClientById(id: string): Promise<any> {
        let sql = "SELECT * FROM tb_client WHERE client_id = $1";
        let valores = [id];

        let result = await this.banco.ExecutaComando(sql, valores);

        return this.toMAP(result[0]);
    }

    public async updateClient(client: any): Promise<void> {
        let sql = "UPDATE tb_client SET client_name = $1, client_cpf = $2, client_address = $3, client_phone = $4 WHERE client_id = $5";
        let valores = [client.name, client.cpf, client.address, client.phone, client.id];

        await this.banco.ExecutaComandoNoQuery(sql, valores);
    }

    public async deleteClient(id: string): Promise<Number | null> {
        let sql = "UPDATE tb_client SET client_active = false WHERE client_id = $1";
        let valores = [id];

        let resultado = await this.banco.ExecutaComandoNoQuery(sql, valores);
        return resultado;
    }

    public async getClients(): Promise<any[]> {
        let sql = "SELECT * FROM tb_client WHERE client_active = true";
        let resultado = await this.banco.ExecutaComando(sql, []);

        return resultado.map(this.toMAP);
    }

    toMAP(row: any): any {
        if (!row) {
            return null;
        }
        return {
            id: row.client_id,
            name: row.client_name,
            cpf: row.client_cpf,
            address: row.client_address,
            phone: row.client_phone,
            userId: row.user_id
        }
    }
}