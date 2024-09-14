import { UpdateAccountPayUsecase } from "../../../../usecases/account-pay/update-account-pay/update-account-pay.usecase";
import { HttpMethod, Route } from "../routes";
import { Response, Request } from "express";

export class UpdateAccountPayRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateContaPagarService: UpdateAccountPayUsecase
    ){}

    public static create(ListContaPagarService: UpdateAccountPayUsecase) {
        return new UpdateAccountPayRoute(
            '/conta-pagar',
            HttpMethod.PUT,
            ListContaPagarService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try{
                let { id, dataVencimento, valor, status, despesa, usuario } = req.body;
                if(id && dataVencimento && valor && status && despesa && usuario){
                    await this.updateContaPagarService.execute({ id, dataVencimento, valor, status, despesa, usuario });
                    res.status(201).send({ message: 'Conta atualizada com sucesso!' });
                }else {
                    res.status(400).send({ message: 'Parâmetros inválidos!' });
                }
            }catch(ex: any){
                res.status(500).send({ message: ex.message });
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