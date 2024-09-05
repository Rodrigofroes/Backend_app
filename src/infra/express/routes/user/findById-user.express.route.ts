import { FindByIdUsercase } from "../../../../usecases/user/findbyid-user/findbyid-user.usecase";
import { HttpMethod } from "../routes";
import { Request, Response } from 'express';
import { Route } from "../routes";

export type FindByIdUserResponseDto = {
    id: string;
    nome: string;
    email: string;
}

export class FindByIdUserRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly FindByIdUserService: FindByIdUsercase
    ) {}

    public static create(FindByIdUserService: FindByIdUsercase) {
        return new FindByIdUserRoute(
            '/usuario/:id',
            HttpMethod.GET,
            FindByIdUserService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const user = await this.FindByIdUserService.execute({ id });

                const userResponse = this.present(user);

                res.status(200).json(userResponse);
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

    private present(input: FindByIdUserResponseDto): FindByIdUserResponseDto {
        const response: FindByIdUserResponseDto = {
            id: input.id,
            nome: input.nome,
            email: input.email
        };
        return response;
    }
}
