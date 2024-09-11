
import { ApiExpress } from "./infra/express/api.express";
import { CreateContaPagarRoute } from "./infra/express/routes/conta-pagar/create-conta-pagar.express.route";
import { DeleteContaPagarRoute } from "./infra/express/routes/conta-pagar/delete-conta-pagar.express.route";
import { FindByIdContaPagarRoute } from "./infra/express/routes/conta-pagar/findbyid-conta-pagar.express.route";
import { ListContaPagarRoute } from "./infra/express/routes/conta-pagar/list-conta-pagar.express.route";
import { UpdateContaPgarUseRoute } from "./infra/express/routes/conta-pagar/update-conta-pagar.express.route";
import { CreateUserRoute } from "./infra/express/routes/user/create-user.express.route";
import { DeleteUserRoute } from "./infra/express/routes/user/delete-user.express.route";
import { FindByEmailAndPasswordUserRoute } from "./infra/express/routes/user/findByEmailAndPassword-user.express.route";
import { FindByIdUserRoute } from "./infra/express/routes/user/findById-user.express.route";
import { ListUserRoute } from "./infra/express/routes/user/list-user.express.route";
import { UpdateUserRoute } from "./infra/express/routes/user/update-user.express.route";
import { ContaPagarRepositoryPrisma } from "./infra/respositories/conta-pagar/conta-pagar.repository.prisma";
import { UserRepositoryPrisma } from "./infra/respositories/user/user.repository.prisma";
import { prisma } from "./package/prisma";
import { CreateContaPagarUsecase } from "./usecases/conta-pagar/create-conta-pagar/create-conta-pagar.usecase";
import { DeleteContaPagarUseCase } from "./usecases/conta-pagar/delete-conta-pagar/delete-conta-pagar.usecase";
import { FindByIdContaPagarUseCase } from "./usecases/conta-pagar/findbyid-conta-pagar/findyid-conta-pagar.usecase";
import ListContaPagarUseCase from "./usecases/conta-pagar/list-conta-pagar/list-conta-pagar.usecase";
import { UpdateContaPagarUseCase } from "./usecases/conta-pagar/update-conta-pagar/update-conta-pagar.usecase";
import { CreateUserUsecase } from "./usecases/user/create-user/create-user.usecase";
import { DeleteUserUsercase } from "./usecases/user/delete-user/delete-user.usecase";
import { FindByEmailAndPasswordUsecase } from "./usecases/user/findByEmailAndPassword-user/findByEmailAndPassword-user.usecase";
import { FindByIdUsercase } from "./usecases/user/findbyid-user/findbyid-user.usecase";
import { ListUserUsecase } from "./usecases/user/list-user/list-user.usecase";
import { UpdateUserUsecase } from "./usecases/user/update-user/update-user.usecase";


function main(){
    const aRepository = UserRepositoryPrisma.create(prisma);
    const aRepositoryContaPagar = ContaPagarRepositoryPrisma.create(prisma);

    // Usuário
    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);
    const findbyIdUserUsecase = FindByIdUsercase.create(aRepository);
    const updateUserUsecase = UpdateUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsercase.create(aRepository);
    const findByEmailAndPassowoesUsecase = FindByEmailAndPasswordUsecase.create(aRepository);

    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);
    const deleteRoute = DeleteUserRoute.create(deleteUserUsecase);
    const findByIdRoute = FindByIdUserRoute.create(findbyIdUserUsecase);
    const updateRoute = UpdateUserRoute.create(updateUserUsecase);
    const updateRouteFindByEmailAndPasswordRoute = FindByEmailAndPasswordUserRoute.create(findByEmailAndPassowoesUsecase);
    
    // Conta Pagar
    const createContaPagarUsecase = CreateContaPagarUsecase.create(aRepositoryContaPagar); 
    const listContaPagarUsecase = ListContaPagarUseCase.create(aRepositoryContaPagar);
    const updateContaPagarUsecase = UpdateContaPagarUseCase.create(aRepositoryContaPagar); 
    const deleteContaPagarUsecase = DeleteContaPagarUseCase.create(aRepositoryContaPagar);
    const findByIdContaPagarUsecase = FindByIdContaPagarUseCase.create(aRepositoryContaPagar);

    const createContaPagarRoute = CreateContaPagarRoute.create(createContaPagarUsecase);
    const listContaPagarRoute = ListContaPagarRoute.create(listContaPagarUsecase);
    const updateContaPagarRoute = UpdateContaPgarUseRoute.create(updateContaPagarUsecase);
    const deleteContaPagarRoute = DeleteContaPagarRoute.create(deleteContaPagarUsecase);
    const findByIdRouteContaPagar = FindByIdContaPagarRoute.create(findByIdContaPagarUsecase);

    const api = ApiExpress.create([createRoute, listRoute, deleteRoute, findByIdRoute, updateRoute,updateRouteFindByEmailAndPasswordRoute ,createContaPagarRoute, listContaPagarRoute, updateContaPagarRoute, deleteContaPagarRoute, findByIdRouteContaPagar]);
    const port = process.env.POST || 3000;
    api.start(port);
}

main();