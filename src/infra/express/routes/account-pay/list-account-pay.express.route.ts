import ListAccountPayUsecase from "../../../../usecases/account-pay/list-account-pay/list-account-pay.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export type ListAccountPayResponseDto = {
    listAccountPay: {
        id: string;
        dataVencimento: Date;
        valor: number;
        status: string;
        despesa: string;
        usuario: string;
    }[]
}

export class ListAccountPayRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly ListAccountPayService:  ListAccountPayUsecase
    ) { }

    public static create(ListAccountPayService: ListAccountPayUsecase) {
        return new ListAccountPayRoute(
            '/account-pay',
            HttpMethod.GET,
            ListAccountPayService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const accountPay = await this.ListAccountPayService.execute();
                const accountPayResponse = this.present(accountPay);
                res.status(200).json(accountPayResponse);
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

    private present(input: ListAccountPayResponseDto): ListAccountPayResponseDto {
        const response: ListAccountPayResponseDto = {
            listAccountPay: input.listAccountPay.map(accoutPay => ({
                id: accoutPay.id,
                dataVencimento: accoutPay.dataVencimento,
                valor: accoutPay.valor,
                status: accoutPay.status,
                despesa: accoutPay.despesa,
                usuario: accoutPay.usuario
            }))
        }

        return response;
    }

    public isProtected(): boolean {
        return true;
    }
}