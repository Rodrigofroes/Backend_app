import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindyByEmailInputDto = {
    email: string;
}

export type FindByEmailOutputDto = Promise<void | null>;

export class FindByEmailUsecase implements Usecase<FindyByEmailInputDto, FindByEmailOutputDto>{
    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway): FindByEmailUsecase {
        return new FindByEmailUsecase(userGateway);
    }

    public async execute({ email }: FindyByEmailInputDto): Promise<FindByEmailOutputDto> {
        const user = await this.userGateway.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return;
    }
}