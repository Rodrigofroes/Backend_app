import { CreateUserUsecase } from "../../../../usecases/user/create-user/create-user.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export type CreateUserReponseDto = {
    id: string;
}

export class CreateUserRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly CreateUserService: CreateUserUsecase
    ){}

    public static create(CreateUserService: CreateUserUsecase){
        return new CreateUserRoute(
            '/users',
            HttpMethod.POST,
            CreateUserService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { nome, email, senha } = req.body;
            const user = await this.CreateUserService.execute({ nome, email, senha });

            res.status(201).json({
                id: user.id
            });
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateUserReponseDto): CreateUserReponseDto {
        return {
            id: input.id
        }
    }
}