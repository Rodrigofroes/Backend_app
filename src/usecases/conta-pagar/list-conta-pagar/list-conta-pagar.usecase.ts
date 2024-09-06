import { ContaPagarGateway } from "../../../domain/conta-pagar/gateway/conta-pagar.gateway";
import { Usecase } from "../../usecase";

export type ListContaPagarInputDto = void;

export type ListContaPagarOutputDto = {
    contasPagar: {
        id: string;
        dataVencimento: Date;
        valor: number;
        status: string;
        despesa: string;
        usuario: string;
    }[];
}

export default class ListContaPagarUseCase implements Usecase<ListContaPagarInputDto, ListContaPagarOutputDto>{
    private constructor(private readonly contaPagarGateway: ContaPagarGateway){}

    public static create(contaPagarGateway: ContaPagarGateway){
        return new ListContaPagarUseCase(contaPagarGateway);
    }

    public async execute(): Promise<ListContaPagarOutputDto> {
        const aContasPagar = await this.contaPagarGateway.list();

        const output: ListContaPagarOutputDto = {
            contasPagar: aContasPagar.map(contaPagar => ({
                id: contaPagar.id,
                dataVencimento: contaPagar.dataVencimento,
                valor: contaPagar.valor,
                status: contaPagar.status,
                despesa: contaPagar.despesa,
                usuario: contaPagar.usuario
            }))
        }

        return output;
    }
}