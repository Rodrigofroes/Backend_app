export type EmailAdapterInterface = {
    sendEmail: (to: string, subject: string, message: string) => Promise<void>
}