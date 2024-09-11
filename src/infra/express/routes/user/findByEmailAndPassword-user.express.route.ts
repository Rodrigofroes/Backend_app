import { HttpMethod } from "../routes";
import { Request, Response } from 'express';
import { Route } from "../routes";
import { FindByEmailAndPasswordUsecase } from "../../../../usecases/user/findByEmailAndPassword-user/findByEmailAndPassword-user.usecase";

export type FindByEmailAndPasswordUserResponseDto = void;

export class FindByEmailAndPasswordUserRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly FindByEmailAndPasswordUserService: FindByEmailAndPasswordUsecase
    ) { }

    public static create(FindByEmailAndPasswordUserService: FindByEmailAndPasswordUsecase) {
        return new FindByEmailAndPasswordUserRoute(
            '/usuario/consulta',
            HttpMethod.POST,
            FindByEmailAndPasswordUserService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<FindByEmailAndPasswordUserResponseDto> {
        return async (req: Request, res: Response) => {
            try {
                const { email, senha } = req.body;
                if (email && senha) {
                    const user = await this.FindByEmailAndPasswordUserService.execute({ email, senha });
                    res.status(200).json({ message: 'Usuário encontrado!' });
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
}
