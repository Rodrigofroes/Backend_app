export type ContaPagarProps = {
    id: string;
    dataVencimento: Date;
    valor: number;
    status: string;
    despesa: string;
    usuario: string;
}

export class ContaPagar{
    constructor(private props: ContaPagarProps){
        this.validateValor();
        this.validateDate();
    }

    public static create(dataVencimento: Date, valor: number, status: string, despesa: string, usuario: string){
        return new ContaPagar({
            id: crypto.randomUUID().toString(),
            dataVencimento,
            valor,
            status,
            despesa,
            usuario
        });
    }

    public static with(props: ContaPagarProps){
        return new ContaPagar(props);
    }

    public get id(){
        return this.props.id;
    }

    public get dataVencimento(){
        return this.props.dataVencimento;
    }

    public get valor(){
        return this.props.valor;
    }

    public get status(){
        return this.props.status;
    }

    public get despesa(){
        return this.props.despesa;
    }

    public get usuario(){
        return this.props.usuario;
    }

    public validateValor(){
        if(this.props.valor <= 0){
            throw new Error('Valor inválido');
        }
    }

    public validateDate(){
        if(this.props.dataVencimento < new Date()){
            throw new Error('Data inválida');
        }
    }
}