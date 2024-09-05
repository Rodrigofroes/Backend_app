import { HttpMethod, Route } from "../routes";
import { CreateContaPagarUsecase } from "../../../../usecases/conta-pagar/create-conta-pagar/create-conta-pagar.usecase";
import { Request, Response } from 'express';

export class CreateContaPagarRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly CreateContaPagarService: CreateContaPagarUsecase
    ) { }

    public static create(CreateContaPagarService: CreateContaPagarUsecase) {
        return new CreateContaPagarRoute(
            '/conta-pagar',
            HttpMethod.POST,
            CreateContaPagarService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { dataVencimento, valor, status, despesa, usuario } = req.body;
                const contaPagar = await this.CreateContaPagarService.execute({ dataVencimento, valor, status, despesa, usuario });
                if (contaPagar) {
                    res.status(201).json({ message: 'Conta a pagar criada com sucesso!' });
                } else {
                    res.status(500).send({ message: 'Erro ao criar conta a pagar' });
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
}
