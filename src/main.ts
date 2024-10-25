import { env } from "process";
import { ApiExpress } from "./Infrastructures/express/api.express";
import { CreateUserRoute } from "./Infrastructures/express/routes/user/createUser.express.route";
import { UserRepository } from "./Infrastructures/repositories/user/user.infrastructure.repository";
import { CreateUserUsecase } from "./usecases/user/createUser.usecase";
import { banco } from "./Infrastructures/package/banco";
import { DeleteUserUsecase } from "./usecases/user/deleteUser.usecase";
import { DeleteUserRoute } from "./Infrastructures/express/routes/user/deleteUser.express.route";
import { GetUserByIdUsecase } from "./usecases/user/getUserById.usecase";
import { GetUserByIdRoute } from "./Infrastructures/express/routes/user/getUserById.express.route";
import { UpdateUserUsecase } from "./usecases/user/updateUser.usecase";
import { AuthMiddleware } from "./Infrastructures/express/middlewares/authMiddleware";
import { AuthUsecase } from "./usecases/auth/auth.usecase";
import { AuthRoute } from "./Infrastructures/express/routes/auth/auth.express.route";
import { CreateClientUsecase } from "./usecases/client/createClient.usecase";
import { CreateClientRoute } from "./Infrastructures/express/routes/client/createClient.express.route";
import { ClientRepository } from "./Infrastructures/repositories/client/client.infrastructure.repository";
import { DeleteClientUsecase } from "./usecases/client/deleteClient.usecase";
import { deleteClienteRoute } from "./Infrastructures/express/routes/client/deleteClient.express.route";
import { UpdateClientUsecase } from "./usecases/client/updateClient.usecase";
import { UpdateClientRoute } from "./Infrastructures/express/routes/client/updateClient.express.route";
import { GetClientByIdUsecase } from "./usecases/client/getClientById.usecase";
import { GetClientByIdRoute } from "./Infrastructures/express/routes/client/getClientById.expess.route";
import { ExpenseRepository } from "./Infrastructures/repositories/expense/expense.infrastructure.repository";
import { ListExpensesUsecase } from "./usecases/expense/listExpenses.usecase";
import { ListExpensesRoute } from "./Infrastructures/express/routes/expense/listExpenses.express.route";
import { CategoryRepository } from "./Infrastructures/repositories/category/category.infrastructure.repository";
import { CreateCategoryUsecase } from "./usecases/category/createCategory.usecase";
import { CreateCategoryRoute } from "./Infrastructures/express/routes/category/createCategory.express.route";
import { DeleteCategoryUsecase } from "./usecases/category/deleteCategory.usecase";
import { DeleteCategoryRoute } from "./Infrastructures/express/routes/category/deleteCategory.express.route";
import { ListCategoryUsecase } from "./usecases/category/listCategory.usecase";
import { ListCategoryRoute } from "./Infrastructures/express/routes/category/listCategory.express.route";
import { ResetPasswordUsecase } from "./usecases/resetPassword/resetPassword.usecase";
import { EmailService } from "./Infrastructures/service/email/email.service";
import { ResetPasswordRoute } from "./Infrastructures/express/routes/resetPassword/resetPassword.express.route";
import { CreateExpenseUsecase } from "./usecases/expense/createExpense.usecase";
import { CreateExpenseRoute } from "./Infrastructures/express/routes/expense/createExpense.express.route";
import { GetExpenseByIdUsecase } from "./usecases/expense/getExpenseById.usecase";
import { GetExpenseByIdRoute } from "./Infrastructures/express/routes/expense/getExpenseById.express.route";
import { UpdateUserRoute } from "./Infrastructures/express/routes/user/updateUser.express.route";
import { DeleteExpenseUsecase } from "./usecases/expense/deleteExpense.usecase";
import { DeleteExpenseRoute } from "./Infrastructures/express/routes/expense/deleteExpense.express.route.";
import { UpdateExpenseUsecase } from "./usecases/expense/updateExpense.usecase";
import { UpdateExpenseRoute } from "./Infrastructures/express/routes/expense/updateExpense.express.route";
import { GetClientsUsecase } from "./usecases/client/getClients.usecase";
import { GetClientsRoute } from "./Infrastructures/express/routes/client/getclients.express.route";

async function main(){
    const middleware = new AuthMiddleware();

    
    // Usuário
    const aRepository = UserRepository.create(banco);

    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsecase.create(aRepository);
    const getUserByIdUsecase = GetUserByIdUsecase.create(aRepository);
    const updateUserUsecase = UpdateUserUsecase.create(aRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const deleteUserRoute = DeleteUserRoute.create(deleteUserUsecase);
    const getUserByIdRoute = GetUserByIdRoute.create(getUserByIdUsecase);
    const updateUserRoute = UpdateUserRoute.create(updateUserUsecase);

    // Auth/login
    const authUsecase = AuthUsecase.create(aRepository, middleware);

    const authRoute = AuthRoute.create(authUsecase);

    // Cliente
    const clientRepository = ClientRepository.create(banco);

    const createClientUsecase = CreateClientUsecase.create(clientRepository);
    const deleteClientUsecase = DeleteClientUsecase.create(clientRepository);
    const updateClientUsecase = UpdateClientUsecase.create(clientRepository);
    const getClientByIdUsecase = GetClientByIdUsecase.create(clientRepository);
    const getClientsUsecase = GetClientsUsecase.create(clientRepository);

    const createClientRoute = CreateClientRoute.create(createClientUsecase);
    const deleteClientRoute = deleteClienteRoute.create(deleteClientUsecase);
    const updateClientRoute = UpdateClientRoute.create(updateClientUsecase);
    const getClientByIdRoute = GetClientByIdRoute.create(getClientByIdUsecase);
    const getClientsRoute = GetClientsRoute.create(getClientsUsecase);

    // Expense
    const expenseRepository = ExpenseRepository.create(banco);

    const listExpensesUsecase = ListExpensesUsecase.create(expenseRepository);
    const createExpenseUsecase = CreateExpenseUsecase .create(expenseRepository);
    const getExpenseByIdUsecase = GetExpenseByIdUsecase.create(expenseRepository);
    const deleteExpenseUsecase = DeleteExpenseUsecase.create(expenseRepository);
    const updateExpenseUsecase = UpdateExpenseUsecase.create(expenseRepository);

    const listExpensesRoute = ListExpensesRoute.create(listExpensesUsecase);
    const createExpenseRoute = CreateExpenseRoute.create(createExpenseUsecase);
    const getExpenseByIdRoute = GetExpenseByIdRoute.create(getExpenseByIdUsecase);
    const deleteExpenseRoute = DeleteExpenseRoute.create(deleteExpenseUsecase);
    const updateExpenseRoute = UpdateExpenseRoute.create(updateExpenseUsecase);

    // Category
    const categoryRepository = CategoryRepository.create(banco);

    const createCategoryUsecase = CreateCategoryUsecase.create(categoryRepository);
    const deleteCategoryUsecase = DeleteCategoryUsecase.create(categoryRepository);
    const listCategoryUsecase = ListCategoryUsecase.create(categoryRepository);

    const createCategoryRoute = CreateCategoryRoute.create(createCategoryUsecase);
    const deleteCategoryRoute = DeleteCategoryRoute.create(deleteCategoryUsecase);
    const listCategoryRoute = ListCategoryRoute.create(listCategoryUsecase);

    // Reset Password
    const emailService = EmailService.create();

    const resetPasswordUsecase = ResetPasswordUsecase.create(aRepository, await emailService);

    const resetPasswordRoute = ResetPasswordRoute.create(resetPasswordUsecase);
    

    const api = ApiExpress.create([
        authRoute,
        createUserRoute,
        deleteUserRoute,
        getUserByIdRoute,
        updateUserRoute,
        getClientsRoute,
        createClientRoute,
        deleteClientRoute,
        updateClientRoute,
        getClientByIdRoute,
        listExpensesRoute,
        createExpenseRoute,
        getExpenseByIdRoute,
        deleteExpenseRoute,
        updateExpenseRoute,
        createCategoryRoute,
        deleteCategoryRoute,
        listCategoryRoute,
        resetPasswordRoute
    ], middleware);

    const port = env.PORT || 3000;
    api.start(port);
}

main();
