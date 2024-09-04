import { UpdateUserUsecase } from "../../../../usecases/user/update-user/update-user.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from 'express';

export class UpdateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly UpdateUserService: UpdateUserUsecase
    ) { }

    public static create(UpdateUserService: UpdateUserUsecase) {
        return new UpdateUserRoute(
            '/usuario/:id',
            HttpMethod.PUT,
            UpdateUserService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { nome, email, senha } = req.body;
                const user = await this.UpdateUserService.execute({ id, nome, email, senha  });

                res.status(200).json({message: 'Usuário atualizado com sucesso!'});
                
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