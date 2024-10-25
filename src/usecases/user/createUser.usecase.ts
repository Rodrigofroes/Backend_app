import { User } from "../../domains/user/entity/user.entity";
import { UserGateway } from "../../domains/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
    name: string,
    email: string,
    password: string
}

export type CreateUserOutputDto = void | null;

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto>{
    private constructor(
        private readonly userGateway: UserGateway
    ){}

    public static create(userGateway: UserGateway){
        return new CreateUserUsecase(userGateway);
    }

    public async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto>{
        this.validadeInput(input);

        const aUser = await this.userGateway.getUserByEmail(input.email);

        if(aUser){
            throw new Error("E-mail já cadastrado");
        }

        const user = User.create(
            input.name, 
            input.email, 
            input.password
        );
        
        let consulta = await this.userGateway.createUser(await user);

        return consulta;
    }

    private validadeInput(input: CreateUserInputDto){
        if(!input.name || !input.email || !input.password){
            throw new Error("Parâmetros inválidos");
        }
    }
}