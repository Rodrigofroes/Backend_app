import { AccoutPayGateway } from "../../../domain/account-pay/gateway/account-pay.gateway";
import { Usecase } from "../../usecase";

export type AccoutPayInputDto= {
    id: string;
}

export type AccountPayOutputDto = void;

export class DeleteAccoutPayUsecase implements Usecase<AccoutPayInputDto, AccountPayOutputDto>{
    private constructor(private readonly AccoutPayGateway: AccoutPayGateway){}

    public static create(AccoutPayGateway: AccoutPayGateway): DeleteAccoutPayUsecase{
        return new DeleteAccoutPayUsecase(AccoutPayGateway);
    }

    public async execute(input: AccoutPayInputDto): Promise<AccountPayOutputDto> {
        const aCcountPay = await this.AccoutPayGateway.findById(input.id);

        if(!aCcountPay){
            throw new Error('Conta não encontrada');
        }

        await this.AccoutPayGateway.delete(input.id);
        return;
    }
}