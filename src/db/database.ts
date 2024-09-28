import { Pool } from "pg";
import { env } from "node:process";

export class Database {
    private pool: Pool;

    constructor(){
        this.pool = new Pool({
            user: env.DB_USER,
            host: env.DB_HOST,
            database: env.DB_NAME,
            password: env.DB_PASS,
            port: Number(env.DB_PORT)
        });
    }

    get conexao() {
        return this.pool;
    }

    set conexao(conexao: Pool) {
        this.pool = conexao;
    }

    public async ExecutaComando(sql: string, parametros: any[]): Promise<any> {
        try {
            const result = await this.pool.query(sql, parametros);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    public async ExecutaComandoNoQuery(sql: string, parametros: any[]): Promise<any> {
        try {
            const result = await this.pool.query(sql, parametros);
            return result; 
        } catch (error) {
            throw error;
        }
    }

    
    public async ExecutaComandoLastInserted(sql: string, parametros: any[]): Promise<any> {
        try {
            const result = await this.pool.query(sql, parametros);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}
