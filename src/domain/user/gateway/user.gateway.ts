import { User } from "../entity/user.entity";

export interface UserGateway {
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
}