import { User } from "../../domains/user/entity/user.entity";
import { UserRepository } from "../../Infrastructures/repositories/user/user.infrastructure.repository";
import { EmailService } from "../../Infrastructures/service/email/email.service";
import { Usecase } from "../usecase";

export type ResetPasswordInputDto = {
    email: string;
}

export type ResetPasswordOutputDto = void | null;

export class ResetPasswordUsecase implements Usecase<ResetPasswordInputDto, ResetPasswordOutputDto>{
    private constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService
    ){}

    public static create(userRepository: UserRepository, emailService: EmailService){
        return new ResetPasswordUsecase(userRepository, emailService);
    }

    public async execute(input: ResetPasswordInputDto): Promise<ResetPasswordOutputDto>{
        let user = await this.userRepository.getUserByEmail(input.email);

        if(!user){
            throw new Error("Usuário não encontrado");
        }

        let newPassword = this.gereratePassword();
        let cryptPassword = await User.encryptPassword(newPassword);

        let resultado = await this.userRepository.updatePassword(user.id, cryptPassword);

        if(!resultado){
            throw new Error("Erro ao atualizar senha");
        }

        let email = await this.emailService.resetPassword(user.email, newPassword);

        return email;
    }

    private gereratePassword(): string{
        return Math.random().toString(36).slice(-8);
    }
}