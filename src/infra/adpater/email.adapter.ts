import nodemailer from 'nodemailer';
import { env } from 'process';

export interface EmailAdapterInterface {
    sendEmail(email: string, subject: string, content: string): Promise<void>;
}

export class EmailAdapter implements EmailAdapterInterface {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.EMAIL_HOST,
            port: Number(env.EMAIL_PORT),
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS
            }
        });
    }

    async sendEmail(email: string, subject: string, content: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                text: content
            });
        } catch (error) {
            throw new Error('Erro ao enviar email');
        }
    }
}
