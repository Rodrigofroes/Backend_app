import { Request, Response } from "express";
import { DeleteUserUsercase } from "../../../../usecases/user/delete-user/delete-user.usecase";
import { HttpMethod, Route } from "../routes";

export class DeleteUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly DeleteUserService: DeleteUserUsercase
    ) { }

    public static create(DeleteUserService: DeleteUserUsercase) {
        return new DeleteUserRoute(
            '/usuario/:id',
            HttpMethod.DELETE,
            DeleteUserService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                if (id) {
                    await this.DeleteUserService.execute({ id });
                    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
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