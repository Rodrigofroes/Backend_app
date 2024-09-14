export interface AuthGateway {
    login(email: string, senha: string): Promise<string>;
}