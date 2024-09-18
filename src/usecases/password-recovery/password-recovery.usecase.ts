import { EmailInterface } from "../../infra/interfaces/email.interface";
import { UserRepositoryPrisma } from "../../infra/repository/user/user.repository.prisma";
import { Usecase } from "../usecase";

export type PasswordRecoveryInputDto = {
    email: string;
}

export type PasswordRecoveryOutputDto = {
    message: string;
}

export class PasswordRecoveryUsecase implements Usecase<PasswordRecoveryInputDto, PasswordRecoveryOutputDto>{
    private constructor(
        private readonly emailService: EmailInterface,
        private readonly userRepository: UserRepositoryPrisma
    ){}

    public static create(emailService: EmailInterface, userRepository: UserRepositoryPrisma){
        return new PasswordRecoveryUsecase(emailService, userRepository);
    }

    public async execute(input: PasswordRecoveryInputDto): Promise<PasswordRecoveryOutputDto> {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const newPassword = this.generatePassword();
        await this.userRepository.updatePassword(user.id, newPassword);
        await this.emailService.sendPasswordRecoveryEmail(user.email, newPassword);

        const output: PasswordRecoveryOutputDto = {
            message: 'E-mail enviado com sucesso'
        }

        return output;
    }

    private generatePassword() {
        return Math.random().toString(36).slice(-8);
    }
}