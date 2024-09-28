import { Database } from "../../../db/database";
import { User } from "../../../domains/user/entity/user.entity";
import { UserGateway } from "../../../domains/user/gateway/user.gateway";

export class UserRepository implements UserGateway {
    private constructor(
        private readonly banco: Database
    ) { }

    public static create(banco: Database) {
        return new UserRepository(banco);
    }

    public async createUser(User: any): Promise<void> {
        let sql = "INSERT INTO tb_user (user_id, user_name, user_email, user_password ) VALUES ($1, $2, $3, $4)";
        let valores = [User.id, User.name, User.email, User.password];

        await this.banco.ExecutaComandoNoQuery(sql, valores);
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        let sql = "SELECT * FROM tb_user WHERE user_email = $1";
        let valores = [email];
        let resultado = await this.banco.ExecutaComando(sql, valores);

        return this.toMAP(resultado[0]);
    }

    public async getUserById(id: string): Promise<User | null> {
        let sql = "SELECT * FROM tb_user WHERE user_id = $1";
        let valores = [id];

        let result = await this.banco.ExecutaComando(sql, valores);

        return this.toMAP(result[0]);
    }

    public async updateUser(User: any): Promise<boolean> {
        let sql = "UPDATE tb_user SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4";
        let valores = [User.name, User.email, User.password, User.id];

        let resultado = await this.banco.ExecutaComandoNoQuery(sql, valores);

        return resultado > 0 ? true : false;
    }

    public async deleteUser(id: string): Promise<Number | null> {
        let sql = "DELETE FROM tb_user WHERE user_id = $1";
        let valores = [id];

        let resultado = await this.banco.ExecutaComandoNoQuery(sql, valores);
        return resultado;
    }

    public async updatePassword(id: string, password: string): Promise<boolean> {
        let sql = "UPDATE tb_user SET user_password = $1 WHERE user_id = $2";
        let valores = [password, id];

        let resultado = await this.banco.ExecutaComandoNoQuery(sql, valores);

        return resultado.rowCount > 0 ? true : false;
    }

    private toMAP(row: any): User | null {
        if (!row) {
            return null;
        }

        return User.with({
            id: row.user_id,
            name: row.user_name,
            email: row.user_email,
            password: row.user_password
        });
    }
    
}