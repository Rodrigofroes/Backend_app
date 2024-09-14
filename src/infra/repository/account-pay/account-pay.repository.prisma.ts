import { PrismaClient } from "@prisma/client";
import { AccoutPayGateway } from "../../../domain/account-pay/gateway/account-pay.gateway";
import { AccountPay } from "../../../domain/account-pay/entity/account-pay.entity";


export class AccountPayRepositoryPrisma implements AccoutPayGateway {
    private constructor(private readonly prisma: PrismaClient) { }

    public static create(prisma: PrismaClient) {
        return new AccountPayRepositoryPrisma(prisma);
    }

    public async save(contaPagar: AccountPay): Promise<void> {
        const data = {
            id: contaPagar.id,
            dataVencimento: new Date(contaPagar.dataVencimento).toISOString(),
            valor: contaPagar.valor,
            status: contaPagar.status,
            despesa: contaPagar.despesa,
            usuario: contaPagar.usuario
        };

        await this.prisma.contaPagar.create({ data: { ...data, usuario: { connect: { id: contaPagar.usuario } } } });
    }


    public async update(contaPagar: AccountPay): Promise<void> {
        const data = {
            id: contaPagar.id,
            dataVencimento: contaPagar.dataVencimento,
            valor: contaPagar.valor,
            status: contaPagar.status,
            despesa: contaPagar.despesa,
            usuario: contaPagar.usuario
        };

        await this.prisma.contaPagar.update({
            where: { id: contaPagar.id },
            data: { ...data, usuario: { connect: { id: contaPagar.usuario } } }
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.contaPagar.delete({ where: { id } });
    }

    public async findById(id: string): Promise<AccountPay | null> {
        const contaPagar = await this.prisma.contaPagar.findUnique({ where: { id } });

        if (!contaPagar) return null;

        return AccountPay.with({
            id: contaPagar.id,
            dataVencimento: contaPagar.dataVencimento,
            valor: contaPagar.valor,
            status: contaPagar.status,
            despesa: contaPagar.despesa,
            usuario: contaPagar.usuarioId
        });
    }
    
    public async list(): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany();

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    public async listByUser(userId: string): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany({ where: { usuarioId: userId } });

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    public async listByStatus(status: string): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany({ where: { status } });

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    public async listByDueDate(date: Date): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany({ where: { dataVencimento: date } });

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    public async listByDueDateRange(startDate: Date, endDate: Date): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany({ where: { dataVencimento: { gte: startDate, lte: endDate } } });

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    public async listByDueDateRangeAndStatus(startDate: Date, endDate: Date, status: string): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany({
            where: {
                dataVencimento: { gte: startDate, lte: endDate },
                status
            }
        });

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    public async listByUserAndStatus(userId: string, status: string): Promise<AccountPay[]> {
        const contasPagar = await this.prisma.contaPagar.findMany({ where: { usuarioId: userId, status } });

        return contasPagar.map((cp) =>
            AccountPay.with({
                id: cp.id,
                dataVencimento: cp.dataVencimento,
                valor: cp.valor,
                status: cp.status,
                despesa: cp.despesa,
                usuario: cp.usuarioId
            })
        );
    }

    



}