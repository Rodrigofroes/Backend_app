
import { ApiExpress } from "./infra/express/api.express";
import { CreateAccontPayRoute } from "./infra/express/routes/account-pay/create-account-pay.express.route";
import { DeleteAccountPayRoute } from "./infra/express/routes/account-pay/delete-account-pay.express.route";
import { FindByAccoutPayRoute } from "./infra/express/routes/account-pay/findbyid-account-pay..express.route";
import { ListAccountPayRoute } from "./infra/express/routes/account-pay/list-account-pay.express.route";
import { UpdateAccountPayRoute } from "./infra/express/routes/account-pay/update-account-pay.express.route";
import { AuthRoute } from "./infra/express/routes/auth/auth.express.route";
import { CreateUserRoute } from "./infra/express/routes/user/create-user.express.route";
import { DeleteUserRoute } from "./infra/express/routes/user/delete-user.express.route";
import { FindByEmailRoute } from "./infra/express/routes/user/findByEmail-user.express";
import { ListUserRoute } from "./infra/express/routes/user/list-user.express.route";
import { UpdateUserRoute } from "./infra/express/routes/user/update-user.express.route";
import { middleware } from "./infra/middleware/authMiddleware";
import { AccountPayRepositoryPrisma } from "./infra/repository/account-pay/account-pay.repository.prisma";
import { AuthRepositoryPrisma } from "./infra/repository/auth/auth.repository.prisma";
import { UserRepositoryPrisma } from "./infra/repository/user/user.repository.prisma";
import { prisma } from "./package/prisma";
import { CreateAccountPayUsecase } from "./usecases/account-pay/create-account-pay/create-account-pay.usecase";
import { DeleteAccoutPayUsecase } from "./usecases/account-pay/delete-account-pay/delete-account-pay.usecase";
import { FindByAccountPayUsecase } from "./usecases/account-pay/findbyid-account-pay/findyid-account-pay.usecase";
import ListAccountPayUsecase from "./usecases/account-pay/list-account-pay/list-account-pay.usecase";
import { UpdateAccountPayUsecase } from "./usecases/account-pay/update-account-pay/update-account-pay.usecase";
import { AuthUsecase } from "./usecases/auth/auth.usecase";
import { CreateUserUsecase } from "./usecases/user/create-user/create-user.usecase";
import { DeleteUserUsercase } from "./usecases/user/delete-user/delete-user.usecase";
import { FindByEmailUsecase } from "./usecases/user/findByEmail-user/findyByEmail-user.usecase";
import { FindByIdUsercase } from "./usecases/user/findbyid-user/findbyid-user.usecase";
import { ListUserUsecase } from "./usecases/user/list-user/list-user.usecase";
import { UpdateUserUsecase } from "./usecases/user/update-user/update-user.usecase";


function main() {
    const aRepository = UserRepositoryPrisma.create(prisma);
    const aRepositoryAccountPay = AccountPayRepositoryPrisma.create(prisma);

    // Criando o authRepository corretamente
    

    // Usuário
    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);
    const updateUserUsecase = UpdateUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsercase.create(aRepository);
    const findByEmailUsecase = FindByEmailUsecase.create(aRepository);

    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);
    const deleteRoute = DeleteUserRoute.create(deleteUserUsecase);
    const updateRoute = UpdateUserRoute.create(updateUserUsecase);
    const findByEmailRoute = FindByEmailRoute.create(findByEmailUsecase);

    // Conta Pagar
    const listAccountPayUsecase = ListAccountPayUsecase.create(aRepositoryAccountPay);
    const updateAccountPayUseCase = UpdateAccountPayUsecase.create(aRepositoryAccountPay);
    const deleteContaPagarUseCase = DeleteAccoutPayUsecase.create(aRepositoryAccountPay);
    const findByAccountPayUsecase = FindByAccountPayUsecase.create(aRepositoryAccountPay);
    const createAccountPayUseCase = CreateAccountPayUsecase.create(aRepositoryAccountPay);

    const createAccoutPayRoute = CreateAccontPayRoute.create(createAccountPayUseCase);
    const listAccountPayRoute = ListAccountPayRoute.create(listAccountPayUsecase);
    const updateAccountePayRoute = UpdateAccountPayRoute.create(updateAccountPayUseCase);
    const deleteACcountPayRoute = DeleteAccountPayRoute.create(deleteContaPagarUseCase);
    const findByIdAccountPayRoute = FindByAccoutPayRoute.create(findByAccountPayUsecase);


    // Auth
    const authRepository = AuthRepositoryPrisma.create(prisma, middleware.create());
    
    const authUsecase = AuthUsecase.create(authRepository);
    const authRoute = AuthRoute.create(authUsecase);

    const api = ApiExpress.create(
        [
            createRoute, listRoute, deleteRoute, updateRoute,
            createAccoutPayRoute, listAccountPayRoute, updateAccountePayRoute, deleteACcountPayRoute, 
            findByIdAccountPayRoute, findByEmailRoute, authRoute
        ], middleware.create()
    );
    
    const port = process.env.POST || 3000;
    api.start(port);
}

main();
