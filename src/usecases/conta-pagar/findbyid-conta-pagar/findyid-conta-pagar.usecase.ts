import { ContaPagarGateway } from "../../../domain/conta-pagar/gateway/conta-pagar.gateway";
import { Usecase } from "../../usecase";

export type FindByIdContaPagatInputDto = {
    id: string;
}

export type FindByIdContaPagarOutputDto = {
    id: string;
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;
}

export class FindByIdContaPagarUseCase implements Usecase<FindByIdContaPagatInputDto, FindByIdContaPagarOutputDto>{
    private constructor(private readonly contaPagarGateway: ContaPagarGateway){}

    public static create(contaPagarGateway: ContaPagarGateway): FindByIdContaPagarUseCase{
        return new FindByIdContaPagarUseCase(contaPagarGateway);
    }

    public async execute(input: FindByIdContaPagatInputDto): Promise<FindByIdContaPagarOutputDto> {
        const aContaPagar = await this.contaPagarGateway.findById(input.id);
        
        if(!aContaPagar){
            throw new Error('Conta não encontrada');
        }
        
        const contaPagar: FindByIdContaPagarOutputDto = ({
            id: aContaPagar.id,
            dataVencimento: aContaPagar.dataVencimento,
            valor: aContaPagar.valor,
            status: aContaPagar.status,
            despesa: aContaPagar.despesa,
            usuario: aContaPagar.usuario
        });
        
        return contaPagar;
    }
}