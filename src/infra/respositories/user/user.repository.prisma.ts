import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prisma: PrismaClient) { }

    public static create(prisma: PrismaClient) {
        return new UserRepositoryPrisma(prisma);
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            name: user.nome,
            email: user.email,
            password: user.senha
        };

        await this.prisma.user.create({ data });
    }

    public async update(user: User): Promise<void> {
        const data = {
            name: user.nome,
            email: user.email,
            password: user.senha
        };

        await this.prisma.user.update({
            where: { id: user.id },
            data
        });
    }

    public async list(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        return users.map((u) =>
            User.with({
                id: u.id,
                nome: u.name,
                email: u.email,
                senha: u.password
            })
        );
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        return User.with({
            id: user.id,
            nome: user.name,
            email: user.email,
            senha: user.password
        });
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        return User.with({
            id: user.id,
            nome: user.name,
            email: user.email,
            senha: user.password
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }

    public async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });

        if (!user) return null;

        return User.with({
            id: user.id,
            nome: user.name,
            email: user.email,
            senha: user.password
        });
    }
}
