import { AccoutPayGateway } from "../../../domain/account-pay/gateway/account-pay.gateway";
import { Usecase } from "../../usecase";

export type ListAccountPayInputDto = void;

export type ListAccountPayOutputDto = {
    listAccountPay: {
        id: string;
        dataVencimento: Date;
        valor: number;
        status: string;
        despesa: string;
        usuario: string;
    }[];
}

export default class ListAccountPayUsecase implements Usecase<ListAccountPayInputDto, ListAccountPayOutputDto>{
    private constructor(private readonly AccoutPayGateway: AccoutPayGateway){}

    public static create(AccoutPayGateway: AccoutPayGateway){
        return new ListAccountPayUsecase(AccoutPayGateway);
    }

    public async execute(): Promise<ListAccountPayOutputDto> {
        const aCcountsPay = await this.AccoutPayGateway.list();

        const output: ListAccountPayOutputDto = {
            listAccountPay: aCcountsPay.map(accountPay => ({
                id: accountPay.id,
                dataVencimento: accountPay.dataVencimento,
                valor: accountPay.valor,
                status: accountPay.status,
                despesa: accountPay.despesa,
                usuario: accountPay.usuario
            }))
        }

        return output;
    }
}