
import { ApiExpress } from "./infra/express/api.express";
import { CreateContaPagarRoute } from "./infra/express/routes/conta-pagar/create-conta-pagar.express.route";
import { CreateUserRoute } from "./infra/express/routes/user/create-user.express.route";
import { DeleteUserRoute } from "./infra/express/routes/user/delete-user.express.route";
import { FindByIdUserRoute } from "./infra/express/routes/user/findById-user.express.route";
import { ListUserRoute } from "./infra/express/routes/user/list-user.express.route";
import { UpdateUserRoute } from "./infra/express/routes/user/update-user.express.route";
import { ContaPagarRepositoryPrisma } from "./infra/respositories/conta-pagar/conta-pagar.repository.prisma";
import { UserRepositoryPrisma } from "./infra/respositories/user/user.repository.prisma";
import { prisma } from "./package/prisma";
import { CreateContaPagarUsecase } from "./usecases/conta-pagar/create-conta-pagar/create-conta-pagar.usecase";
import { CreateUserUsecase } from "./usecases/user/create-user/create-user.usecase";
import { DeleteUserUsercase } from "./usecases/user/delete-user/delete-user.usecase";
import { FindByIdUsercase } from "./usecases/user/findbyid-user/findbyid-user.usecase";
import { ListUserUsecase } from "./usecases/user/list-user/list-user.usecase";
import { UpdateUserUsecase } from "./usecases/user/update-user/update-user.usecase";


function main(){
    const aRepository = UserRepositoryPrisma.create(prisma);
    const aRepositoryContaPagar = ContaPagarRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);
    const findbyIdUserUsecase = FindByIdUsercase.create(aRepository);
    const updateUserUsecase = UpdateUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsercase.create(aRepository);

    const createContaPagarUsecase = CreateContaPagarUsecase.create(aRepositoryContaPagar); 
    
    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);
    const deleteRoute = DeleteUserRoute.create(deleteUserUsecase);
    const findByIdRoute = FindByIdUserRoute.create(findbyIdUserUsecase);
    const updateRoute = UpdateUserRoute.create(updateUserUsecase);

    const createContaPagarRoute = CreateContaPagarRoute.create(createContaPagarUsecase);


    const api = ApiExpress.create([createRoute, listRoute, deleteRoute, findByIdRoute, updateRoute, createContaPagarRoute]);
    const port = process.env.POST || 3000;
    api.start(port);
}

main();