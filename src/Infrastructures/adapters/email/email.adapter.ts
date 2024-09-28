import { EmailAdapterInterface } from "./interface/email.interface";
import nodemailer from 'nodemailer';
import { env } from 'process';

export class Emailadapter implements EmailAdapterInterface{
    private constructor(
        private readonly transporter: nodemailer.Transporter
    ){}
    
    public static async createTransporter(): Promise<Emailadapter>{
        const transporter = nodemailer.createTransport({
            host: env.EMAIL_HOST,
            port: Number(env.EMAIL_PORT),
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS
            }
        });

        return new Emailadapter(transporter);
    }

    public async sendEmail(to: string, subject: string, message: string): Promise<void>{
        const result = await this.transporter.sendMail({
            from: env.EMAIL_USER,
            to,
            subject,
            text: message
        });

        return result;
    }
}