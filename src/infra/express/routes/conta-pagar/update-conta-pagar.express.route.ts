import { UpdateContaPagarUseCase } from "../../../../usecases/conta-pagar/update-conta-pagar/update-conta-pagar.usecase";
import { HttpMethod, Route } from "../routes";
import { Response, Request } from "express";

export class UpdateContaPgarUseRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateContaPagarService: UpdateContaPagarUseCase
    ){}

    public static create(ListContaPagarService: UpdateContaPagarUseCase) {
        return new UpdateContaPgarUseRoute(
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