import { ContaPagar } from "../entity/conta-pagar.entity";

export interface ContaPagarGateway{
    save(contaPagar: ContaPagar): Promise<void>;
    update(contaPagar: ContaPagar): Promise<void>;
    list(): Promise<ContaPagar[]>;
    findById(id: string): Promise<ContaPagar | null>;
    delete(id: string): Promise<void>;
    listByUser(id: string): Promise<ContaPagar[]>;
    listByStatus(status: string): Promise<ContaPagar[]>;
    listByDueDate(date: Date): Promise<ContaPagar[]>;
    listByDueDateRange(startDate: Date, endDate: Date): Promise<ContaPagar[]>;
    listByDueDateRangeAndStatus(startDate: Date, endDate: Date, status: string): Promise<ContaPagar[]>;
    listByUserAndStatus(id: string, status: string): Promise<ContaPagar[]>;
}