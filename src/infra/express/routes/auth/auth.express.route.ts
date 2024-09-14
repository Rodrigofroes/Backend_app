import { AuthUsecase } from "../../../../usecases/auth/auth.usecase";
import { HttpMethod, Route } from "../routes";

export class AuthRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authSerive: AuthUsecase
    ) { }

    public static create(authSerive: AuthUsecase) {
        return new AuthRoute(
            '/auth/login',
            HttpMethod.POST,
            authSerive
        )
    }

    public getHandler(): (req: any, res: any) => Promise<void> {
        return async (req: any, res: any) => {
            try {
                const { email, senha } = req.body;
                if (email && senha) {
                    const token = await this.authSerive.execute({ email, senha });
                    if (token) {
                        res.setHeader('Authorization', `Bearer ${token}`);
                        res.status(200).json({ message: 'Login efetuado com sucesso!' });
                    } else {
                        res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
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