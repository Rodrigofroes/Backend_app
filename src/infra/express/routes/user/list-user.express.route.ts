import { ListUserUsecase } from "../../../../usecases/user/list-user/list-user.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export type ListUserReponseDto = {
    users: {
        id: string;
        nome: string;
        email: string;
    }[]
}

export class ListUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly ListUserService: ListUserUsecase
    ) {}

    public static create(ListUserService: ListUserUsecase) {
        return new ListUserRoute(
            '/usuarios',
            HttpMethod.GET,
            ListUserService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const users = await this.ListUserService.execute();
                const usersResponse = this.present(users);

                res.status(200).json(usersResponse);
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

    private present(input: ListUserReponseDto): ListUserReponseDto {
        const reponse: ListUserReponseDto = {
            users: input.users.map(user => ({
                id: user.id,
                nome: user.nome,
                email: user.email
            }))
        }

        return reponse;
    }
}