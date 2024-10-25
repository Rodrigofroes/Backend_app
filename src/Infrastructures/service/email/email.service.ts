import { Emailadapter } from "../../adapters/email/email.adapter";
import { EmailServiceInterface } from "./interface/email.service.interface";

export class EmailService implements EmailServiceInterface{
    private constructor(
        private readonly emailAdapter: Emailadapter
    ){}

    public static async create(): Promise<EmailService>{
        const emailAdapter = await Emailadapter.createTransporter();
        return new EmailService(emailAdapter);
    }

    public async resetPassword(email: string, password: string): Promise<void>{
        const message = "Foi gerado um nova senha para você: " + password + ".\nPor favor, altere sua senha assim que possível.";
        const resultando = await this.emailAdapter.sendEmail(email, "Resetar senha", message);

        return resultando;
    }
}