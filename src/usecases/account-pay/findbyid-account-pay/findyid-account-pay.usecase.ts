import { AccoutPayGateway } from "../../../domain/account-pay/gateway/account-pay.gateway";
import { Usecase } from "../../usecase";

export type FindByAccountPayInputDto = {
    id: string;
}

export type FindByAccountPayOutputDto = {
    id: string;
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;
}

export class FindByAccountPayUsecase implements Usecase<FindByAccountPayInputDto, FindByAccountPayOutputDto>{
    private constructor(private readonly AccoutPayGateway: AccoutPayGateway){}

    public static create(AccoutPayGateway: AccoutPayGateway): FindByAccountPayUsecase{
        return new FindByAccountPayUsecase(AccoutPayGateway);
    }

    public async execute(input: FindByAccountPayInputDto): Promise<FindByAccountPayOutputDto> {
        const aCcountPay = await this.AccoutPayGateway.findById(input.id);
        
        if(!aCcountPay){
            throw new Error('Conta não encontrada');
        }
        
        const accoutPay: FindByAccountPayOutputDto = ({
            id: aCcountPay.id,
            dataVencimento: aCcountPay.dataVencimento,
            valor: aCcountPay.valor,
            status: aCcountPay.status,
            despesa: aCcountPay.despesa,
            usuario: aCcountPay.usuario
        });
        
        return accoutPay;
    }
}