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
            '/usuario',
            HttpMethod.PUT,
            UpdateUserService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                
                const { id, nome, email, senha } = req.body;
                if(id && nome && email && senha) {
                    await this.UpdateUserService.execute({ id, nome, email, senha });
                    res.status(200).json({message: 'Usuário atualizado com sucesso!'});
                }else {
                    res.status(400).json({message: 'Parâmetros inválidos!'});
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