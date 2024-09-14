import { AccountPay } from "../entity/account-pay.entity";

export interface AccoutPayGateway{
    save(AccountPay: AccountPay): Promise<void>;
    update(AccountPay: AccountPay): Promise<void>;
    list(): Promise<AccountPay[]>;
    findById(id: string): Promise<AccountPay | null>;
    delete(id: string): Promise<void>;
    listByUser(id: string): Promise<AccountPay[]>;
    listByStatus(status: string): Promise<AccountPay[]>;
    listByDueDate(date: Date): Promise<AccountPay[]>;
    listByDueDateRange(startDate: Date, endDate: Date): Promise<AccountPay[]>;
    listByDueDateRangeAndStatus(startDate: Date, endDate: Date, status: string): Promise<AccountPay[]>;
    listByUserAndStatus(id: string, status: string): Promise<AccountPay[]>;
}