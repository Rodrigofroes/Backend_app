import { AccountPay } from "../../../domain/account-pay/entity/account-pay.entity";
import { AccoutPayGateway } from "../../../domain/account-pay/gateway/account-pay.gateway";
import { Usecase } from "../../usecase";

export type AccountPayInputDto = {
    id: string,
    dataVencimento: Date,
    valor: number,
    status: string,
    despesa: string,
    usuario: string
}

export type AccountPayOutputDto = void;

export class UpdateAccountPayUsecase implements Usecase<AccountPayInputDto, AccountPayOutputDto> {
    private constructor(private readonly AccoutPayGateway: AccoutPayGateway) { }

    public static create(AccoutPayGateway: AccoutPayGateway): UpdateAccountPayUsecase {
        return new UpdateAccountPayUsecase(AccoutPayGateway);
    }

    public async execute(input: AccountPayInputDto): Promise<AccountPayOutputDto> {
        const aCcountPay = this.AccoutPayGateway.findById(input.id);

        if (!aCcountPay) {
            throw new Error('Conta não encontrada');
        }

        this.validateAccountPay(input);

        const accountPay = AccountPay.with({
            id: input.id,
            dataVencimento: input.dataVencimento,
            valor: input.valor,
            status: input.status,
            despesa: input.despesa,
            usuario: input.usuario
        });

        await this.AccoutPayGateway.update(accountPay);
        return;
    }

    public validateAccountPay(accountPay: AccountPayInputDto) {
        if (!accountPay.dataVencimento) {
            throw new Error('Data de vencimento é obrigatória');
        }
        if (!accountPay.valor) {
            throw new Error('Valor é obrigatório');
        }
        if (!accountPay.status) {
            throw new Error('Status é obrigatório');
        }
        if (!accountPay.despesa) {
            throw new Error('Despesa é obrigatória');
        }
        if (!accountPay.usuario) {
            throw new Error('Usuário é obrigatório');
        }
    }
}