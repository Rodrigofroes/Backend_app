import { Request, Response } from "express";
import { ResetPasswordUsecase } from "../../../../usecases/resetPassword/resetPassword.usecase";
import { HttpMethod, Route } from "../route";

export class ResetPasswordRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly resetPasswordUsecase: ResetPasswordUsecase
    ) { }

    /**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Resetar senha de usuário
 *     description: Reseta a senha do usuário associado ao e-mail fornecido.
 *     tags: [Reset Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: O endereço de e-mail do usuário.
 *                 example: "usuario@exemplo.com"
 *     responses:
 *       200:
 *         description: Senha resetada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha alterada com sucesso"
 *       500:
 *         description: Erro no servidor ou falha ao resetar a senha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao alterar senha"
 */

    public static create(resetPasswordUsecase: ResetPasswordUsecase) {
        return new ResetPasswordRoute(
            "/reset-password",
            HttpMethod.POST,
            resetPasswordUsecase
        );
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            try {
                let { email } = req.body;
                if (email) {
                    let resultado = await this.resetPasswordUsecase.execute({ email });
                    if (resultado) {
                        res.status(200).json({
                            message: "Senha redefinida com sucesso"
                        });
                    } else {
                        res.status(500).json({
                            message: "Erro ao alterar senha"
                        });
                    }
                }
            } catch (error: any) {
                res.status(500).send({
                    message: error.message
                });
            }
        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    isProtected(): boolean {
        return false;
    }
}