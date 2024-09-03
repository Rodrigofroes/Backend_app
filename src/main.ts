
import { ApiExpress } from "./infra/express/api.express";
import { CreateUserRoute } from "./infra/express/routes/user/create-user.express.route";
import { ListUserRoute } from "./infra/express/routes/user/list-user.express.route";
import { UserRepositoryPrisma } from "./infra/respositories/user/user.repository.prisma";
import { prisma } from "./package/prisma";
import { CreateUserUsecase } from "./usecases/user/create-user/create-user.usecase";
import { DeleteUserUsercase } from "./usecases/user/delete-user/delete-user.usecase";
import { FindByIdUsercase } from "./usecases/user/findbyid-user/findbyid-user.usecase";
import { ListUserUsecase } from "./usecases/user/list-user/list-user.usecase";
import { UpdateUserUsecase } from "./usecases/user/update-user/update-user.usecase";


function main(){
    const aRepository = UserRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);
    const findbyIdUserUsecase = FindByIdUsercase.create(aRepository);
    const updateUserUsecase = UpdateUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsercase.create(aRepository);

    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = process.env.POST || 3000;
    api.start(port);
}

main();