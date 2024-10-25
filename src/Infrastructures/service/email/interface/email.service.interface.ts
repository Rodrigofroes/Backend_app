export interface EmailServiceInterface {
    resetPassword(email: string, password: string): Promise<void>;
}