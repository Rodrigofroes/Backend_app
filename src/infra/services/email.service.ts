
import { EmailAdapter } from "../adpater/email.adapter";
import { EmailInterface } from "../interfaces/email.interface";

export class EmailService implements EmailInterface {
    private constructor(
        private readonly emailAdapter: EmailAdapter
    ) {}

    public static create(emailAdapter: EmailAdapter): EmailService {
        return new EmailService(emailAdapter);
    }

    async sendPasswordRecoveryEmail(email: string, senha: string): Promise<void> {
        const subject = 'Recuperação de senha';
        const content = `Olá, você solicitou a recuperação de senha, sua nova senha é: ${senha}`;
        
        await this.emailAdapter.sendEmail(email, subject, content);
    }
}
