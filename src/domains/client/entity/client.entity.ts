export type ClientProps = {
    id: string,
    name: string,
    cpf: string,
    address: string,
    phone: string,
    userId: string
}

export class Client{
    private constructor(private props: ClientProps){}

    public static create(name: string, cpf: string, address: string, phone: string, userId: string){
        return new Client({
            id: crypto.randomUUID().toString(),
            name,
            cpf,
            address,
            phone,
            userId
        });
    }

    public static with(props: ClientProps){
        return new Client(props);
    }

    get id(){
        return this.props.id;
    }

    get name(){
        return this.props.name;
    }

    get cpf(){
        return this.props.cpf;
    }

    get address(){
        return this.props.address;
    }

    get phone(){
        return this.props.phone;
    }

    get userId(){
        return this.props.userId;
    }
}