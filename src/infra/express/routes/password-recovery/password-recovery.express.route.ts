import { PasswordRecoveryUsecase } from "../../../../usecases/password-recovery/password-recovery.usecase";
import { HttpMethod, Route } from "../routes";
import { Response, Request } from 'express';

export type PasswordRecoveryResponse = {
    message: string;
}

export class PasswordRecoveryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly passwordRecoveryService: PasswordRecoveryUsecase
    ){}

    public static create(passwordRecoveryService: PasswordRecoveryUsecase){
        return new PasswordRecoveryRoute(
            '/recuperar-senha',
            HttpMethod.POST,
            passwordRecoveryService
        )
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                const { email } = req.body;
                if (email) {
                    const output = await this.passwordRecoveryService.execute({ email });
                    if(output){
                        res.status(200).json({ message: output.message });
                    } else {
                        res.status(401).json({ message: 'Usuário não encontrado' });
                    }
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

    public isProtected(): boolean {
        return false;
    }
}
