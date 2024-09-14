import { FindByEmailUsecase } from "../../../../usecases/user/findByEmail-user/findyByEmail-user.usecase";
import { Route } from "../routes";
import { HttpMethod } from "../routes";
import { Request, Response } from 'express';

export type FindByEmailUserResponseDto = void;

export class FindByEmailRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly FindByEmailUserService: FindByEmailUsecase
    ) { }

    public static create(FindByEmailUserService: FindByEmailUsecase) {
        return new FindByEmailRoute(
            '/usuario/email',
            HttpMethod.POST,
            FindByEmailUserService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<FindByEmailUserResponseDto> {
        return async (req: Request, res: Response) => {
            try {
                const { email } = req.body;
                if (email) {
                    const user = await this.FindByEmailUserService.execute({ email });
                    if(user) {
                        res.status(200).json({ message: 'Usuário encontrado com sucesso!' });
                    } else {
                        res.status(404).json({ message: 'Usuário não encontrado' });
                    }
                } else {
                    res.status(400).json({ message: 'Parâmetros inválidos!' });
                }
            } catch (error: any) {
                res.status(500).send({ message: error.message });
            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public isProtected(): boolean {
        return false;
    }
}