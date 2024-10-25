import {Response, Request, NextFunction } from  'express'

export interface AuthInterface {
    gerarToken(id: string, name: string, password: string): string;
    validarToken(req: Request, res: Response, next: NextFunction): void
}