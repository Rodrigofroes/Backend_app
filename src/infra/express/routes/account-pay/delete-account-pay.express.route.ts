import { DeleteAccoutPayUsecase } from "../../../../usecases/account-pay/delete-account-pay/delete-account-pay.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export class DeleteAccountPayRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteContaPagarService: DeleteAccoutPayUsecase
    ){}

    public static create(deleteContaPagarService: DeleteAccoutPayUsecase){
        return new DeleteAccountPayRoute(
            '/conta-pagar/:id',
            HttpMethod.DELETE,
            deleteContaPagarService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if(id){
                    await this.deleteContaPagarService.execute({ id });
                    res.status(201).send({ message: 'Conta deletada com sucesso!' });
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

    public isProtected(): boolean {
        return true;
    }
}