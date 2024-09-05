import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type ListUserInputDto = void;

export type ListUserOutputDtpo = {
    users : {
        id: string;
        nome: string;
        email: string;
    }[];
}

export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDtpo>{
    private constructor(private readonly useGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new ListUserUsecase(userGateway);
    }

    public async execute(): Promise<ListUserOutputDtpo>{
        const aUsers = await this.useGateway.list();

        const output: ListUserOutputDtpo = {
            users: aUsers.map(user => ({
                id: user.id,
                nome: user.nome,
                email: user.email
            }))
        }

        return output;
    }
}