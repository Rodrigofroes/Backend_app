export interface EmailInterface {
    sendPasswordRecoveryEmail(email: string, senha: string): Promise<void>;
}