import { ContaPagarGateway } from "../../../domain/conta-pagar/gateway/conta-pagar.gateway";
import { Usecase } from "../../usecase";

export type ContaPagarInputDto= {
    id: string;
}

export type ContaPagarOutputDto = void;

export class DeleteContaPagarUseCase implements Usecase<ContaPagarInputDto, ContaPagarOutputDto>{
    private constructor(private readonly contaPagarGateway: ContaPagarGateway){}

    public static create(contaPagarGateway: ContaPagarGateway): DeleteContaPagarUseCase{
        return new DeleteContaPagarUseCase(contaPagarGateway);
    }

    public async execute(input: ContaPagarInputDto): Promise<ContaPagarOutputDto> {
        const aContaPagar = await this.contaPagarGateway.findById(input.id);

        if(!aContaPagar){
            throw new Error('Conta não encontrada');
        }

        await this.contaPagarGateway.delete(input.id);
        return;
    }
}