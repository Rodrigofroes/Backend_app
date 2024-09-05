import { ContaPagar } from "../../../domain/conta-pagar/entity/conta-pagar.entity";
import { ContaPagarGateway } from "../../../domain/conta-pagar/gateway/conta-pagar.gateway";
import { Usecase } from "../../usecase";

export type CreateContaPagarInputDto = {
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;   
}

export type CreateContaPagarOutputDto = {
    id: string;
}

export class CreateContaPagarUsecase implements Usecase<CreateContaPagarInputDto, CreateContaPagarOutputDto>{
    private constructor(private readonly contaPagarGateway: ContaPagarGateway){}

    public static create(contaPagarGateway: ContaPagarGateway){
        return new CreateContaPagarUsecase(contaPagarGateway);
    }

    public async execute(input: CreateContaPagarInputDto): Promise<CreateContaPagarOutputDto> {
        this.validateContaPagar(input);
        const acontaPagar = ContaPagar.create(input.dataVencimento, input.valor, input.status, input.despesa, input.usuario);

        await this.contaPagarGateway.save(acontaPagar);

        const output: CreateContaPagarOutputDto = {
            id: acontaPagar.id
        }

        return output;
    }

    public validateContaPagar(ContaPagar: CreateContaPagarInputDto) {
        if (!ContaPagar.dataVencimento) {
            throw new Error('Data de vencimento é obrigatória');
        }
        if (!ContaPagar.valor) {
            throw new Error('Valor é obrigatório');
        }
        if (!ContaPagar.status) {
            throw new Error('Status é obrigatório');
        }
        if (!ContaPagar.despesa) {
            throw new Error('Despesa é obrigatória');
        }
        if (!ContaPagar.usuario) {
            throw new Error('Usuário é obrigatório');
        }
    }

}