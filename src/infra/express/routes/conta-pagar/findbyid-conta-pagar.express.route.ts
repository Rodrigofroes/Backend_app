import { FindByIdContaPagarUseCase } from "../../../../usecases/conta-pagar/findbyid-conta-pagar/findyid-conta-pagar.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export type FindByIdContaPagarResponseDto = {
    id: string;
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;
}

export class FindByIdContaPagarRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findContaPagarService: FindByIdContaPagarUseCase
    ){}
    
    public static create(findContaPagarService: FindByIdContaPagarUseCase){
        return new FindByIdContaPagarRoute(
            '/conta-pagar/:id',
            HttpMethod.GET,
            findContaPagarService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if(id){
                    const contaPagar = await this.findContaPagarService.execute({ id });
                    const contaPagarResponse = this.present(contaPagar);
                    res.status(200).json(contaPagarResponse);
                }else{
                    res.status(400).send({ message: 'Parâmetros inválidos!' });
                }
            } catch (error: any) {
                res.status(500).send({ message: error.message });
            }
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: FindByIdContaPagarResponseDto): FindByIdContaPagarResponseDto {
        const response: FindByIdContaPagarResponseDto = {
            id: input.id,
            dataVencimento: input.dataVencimento,
            valor: input.valor,
            status: input.status,
            despesa: input.despesa,
            usuario: input.usuario
        }

        return response;
    }

    public isProtected(): boolean {
        return true;
    }

}