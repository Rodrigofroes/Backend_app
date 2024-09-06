import { CreateUserUsecase } from "../../../../usecases/user/create-user/create-user.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly CreateUserService: CreateUserUsecase
    ) { }

    public static create(CreateUserService: CreateUserUsecase) {
        return new CreateUserRoute(
            '/usuario',
            HttpMethod.POST,
            CreateUserService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { nome, email, senha } = req.body;
                if (nome && email && senha) {
                    await this.CreateUserService.execute({ nome, email, senha });
                    res.status(201).json({ message: 'Usuário criado com sucesso!' });
                } else {
                    res.status(400).json({ message: 'Parâmetros inválidos!' });
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