import { User } from "../entity/user.entity";

export interface UserGataway {
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    delete(id: string): Promise<void>;
}