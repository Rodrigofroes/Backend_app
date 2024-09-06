import { ContaPagar } from "../../../domain/conta-pagar/entity/conta-pagar.entity";
import { ContaPagarGateway } from "../../../domain/conta-pagar/gateway/conta-pagar.gateway";
import { Usecase } from "../../usecase";

export type ContaPagarInputDto = {
    id: string,
    dataVencimento: Date,
    valor: number,
    status: string,
    despesa: string,
    usuario: string
}

export type ContaPagarOutputDto = void;

export class UpdateContaPagarUseCase implements Usecase<ContaPagarInputDto, ContaPagarOutputDto> {
    private constructor(private readonly contaPagarGateway: ContaPagarGateway) { }

    public static create(contaPagarGateway: ContaPagarGateway): UpdateContaPagarUseCase {
        return new UpdateContaPagarUseCase(contaPagarGateway);
    }

    public async execute(input: ContaPagarInputDto): Promise<ContaPagarOutputDto> {
        const aContaPagar = this.contaPagarGateway.findById(input.id);

        if (!aContaPagar) {
            throw new Error('Conta não encontrada');
        }

        this.validateContaPagar(input);

        const contaPagar = ContaPagar.with({
            id: input.id,
            dataVencimento: input.dataVencimento,
            valor: input.valor,
            status: input.status,
            despesa: input.despesa,
            usuario: input.usuario
        });

        await this.contaPagarGateway.update(contaPagar);
        return;
    }

    public validateContaPagar(contaPagar: ContaPagarInputDto) {
        if (!contaPagar.dataVencimento) {
            throw new Error('Data de vencimento é obrigatória');
        }
        if (!contaPagar.valor) {
            throw new Error('Valor é obrigatório');
        }
        if (!contaPagar.status) {
            throw new Error('Status é obrigatório');
        }
        if (!contaPagar.despesa) {
            throw new Error('Despesa é obrigatória');
        }
        if (!contaPagar.usuario) {
            throw new Error('Usuário é obrigatório');
        }
    }
}