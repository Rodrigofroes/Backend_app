import ListContaPagarUseCase from "../../../../usecases/conta-pagar/list-conta-pagar/list-conta-pagar.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export type ListContaPagarResponseDto = {
    contasPagar: {
        id: string;
        dataVencimento: Date;
        valor: number;
        status: string;
        despesa: string;
        usuario: string;
    }[]
}

export class ListContaPagarRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly ListContaPagarService: ListContaPagarUseCase
    ) { }

    public static create(ListContaPagarService: ListContaPagarUseCase) {
        return new ListContaPagarRoute(
            '/conta-pagar',
            HttpMethod.GET,
            ListContaPagarService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const contasPagar = await this.ListContaPagarService.execute();
                const contasPagarResponse = this.present(contasPagar);
                res.status(200).json(contasPagarResponse);
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

    private present(input: ListContaPagarResponseDto): ListContaPagarResponseDto {
        const response: ListContaPagarResponseDto = {
            contasPagar: input.contasPagar.map(contaPagar => ({
                id: contaPagar.id,
                dataVencimento: contaPagar.dataVencimento,
                valor: contaPagar.valor,
                status: contaPagar.status,
                despesa: contaPagar.despesa,
                usuario: contaPagar.usuario
            }))
        }

        return response;
    }

    public isProtected(): boolean {
        return true;
    }
}