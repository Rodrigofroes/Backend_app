export interface AuthInterface {
    login(email: string, senha: string): any;
    gerarToken(user: any): string;
    validarToken(token: string): any;
}