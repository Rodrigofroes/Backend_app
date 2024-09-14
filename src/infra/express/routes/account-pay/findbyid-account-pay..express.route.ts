import { FindByAccountPayUsecase } from "../../../../usecases/account-pay/findbyid-account-pay/findyid-account-pay.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export type FindByAccountPayResponseDto = {
    id: string;
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;
}

export class FindByAccoutPayRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findByAccountService: FindByAccountPayUsecase
    ){}
    
    public static create(findByAccountService: FindByAccountPayUsecase){
        return new FindByAccoutPayRoute(
            '/account-pay/:id',
            HttpMethod.GET,
            findByAccountService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if(id){
                    const accountPay = await this.findByAccountService.execute({ id });
                    const accountPayResponse = this.present(accountPay);
                    res.status(200).json(accountPayResponse);
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

    private present(input: FindByAccountPayResponseDto): FindByAccountPayResponseDto {
        const response: FindByAccountPayResponseDto = {
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