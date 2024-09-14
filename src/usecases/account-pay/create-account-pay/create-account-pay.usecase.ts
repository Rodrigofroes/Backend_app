import { AccountPay } from "../../../domain/account-pay/entity/account-pay.entity";
import { AccoutPayGateway } from "../../../domain/account-pay/gateway/account-pay.gateway";
import { Usecase } from "../../usecase";

export type CreateAccountPayIntDto = {
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;   
}

export type CreateAccountPayOutputDto = {
    id: string;
}

export class CreateAccountPayUsecase implements Usecase<CreateAccountPayIntDto, CreateAccountPayOutputDto>{
    private constructor(private readonly AccoutPayGateway: AccoutPayGateway){}

    public static create(AccoutPayGateway: AccoutPayGateway){
        return new CreateAccountPayUsecase(AccoutPayGateway);
    }

    public async execute(input: CreateAccountPayIntDto): Promise<CreateAccountPayOutputDto> {
        this.validateAccountPay(input);
        const aCcountPay = AccountPay.create(input.dataVencimento, input.valor, input.status, input.despesa, input.usuario);

        await this.AccoutPayGateway.save(aCcountPay);

        const output: CreateAccountPayOutputDto = {
            id: aCcountPay.id
        }

        return output;
    }

    public validateAccountPay(CreateAccout: CreateAccountPayIntDto) {
        if (!CreateAccout.dataVencimento) {
            throw new Error('Data de vencimento é obrigatória');
        }
        if (!CreateAccout.valor) {
            throw new Error('Valor é obrigatório');
        }
        if (!CreateAccout.status) {
            throw new Error('Status é obrigatório');
        }
        if (!CreateAccout.despesa) {
            throw new Error('Despesa é obrigatória');
        }
        if (!CreateAccout.usuario) {
            throw new Error('Usuário é obrigatório');
        }
    }

}