
import { PrismaClient } from "@prisma/client";
import { AuthGateway } from "../../middleware/gateway/authGateway";
import { middleware } from "../../middleware/authMiddleware";

export class AuthRepositoryPrisma implements AuthGateway {
    private constructor(
        private readonly prisma: PrismaClient,
        private readonly middleware: middleware 
    ) { }

    public static create(prisma: PrismaClient, middleware: middleware) {
        return new AuthRepositoryPrisma(prisma, middleware);
    }

    public async login(email: string, password: string): Promise<string> {
        let consulta = await this.prisma.user.findFirst({
            where: { email, password }
        });

        if (!consulta) {
            throw new Error('Usuário e/ou senha inválidos');
        }

        let user = {
            id: consulta.id,
            email: consulta.email,
            nome: consulta.name
        };

        return this.middleware.gerarToken(user);
    }
}
