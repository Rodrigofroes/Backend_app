import { User } from "../entity/user.entity";

export interface UserGateway {
    createUser: (user: User) => Promise<void>;
    getUserByEmail: (email: string) => Promise<User | null>;
    getUserById: (id: string) => Promise<User | null>;
    updateUser: (user: User) => Promise<boolean>;
    deleteUser: (id: string) => Promise<Number | null>;
    updatePassword: (id: string, password: string) => Promise<boolean>;
}