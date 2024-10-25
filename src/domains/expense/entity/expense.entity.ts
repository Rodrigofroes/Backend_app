export type ExpensePros = {
    id: string,
    description: string,
    value: number,
    date: Date,
    category: string
}

export class Expense {
    map: any;
    private constructor(private readonly props: ExpensePros) {}

    public static create(description: string, value: number, date: Date, category: string){
        return new Expense({
            id: crypto.randomUUID().toString(),
            description,
            value,
            date,
            category
        });
    }

    public static with(props: ExpensePros){
        return new Expense(props);
    }

    get id(){
        return this.props.id;
    }

    get description(){
        return this.props.description;
    }

    get value(){
        return this.props.value;
    }

    get date(){
        return this.props.date;
    }

    get category(){
        return this.props.category;
    }
}