export type UserProps = {
    id: string;
    nome: string;
    email: string;
    senha: string;
}

export class User {
    private constructor(private props: UserProps) {
        this.validateEmail();
        this.validateSenha();
    }

    public static create(nome: string, email: string, senha: string) {
        return new User({
            id: crypto.randomUUID().toString(),
            nome,
            email,
            senha
        })
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    public get id() {
        return this.props.id;
    }

    public get nome() {
        return this.props.nome;
    }

    public get email() {
        return this.props.email;
    }

    public get senha() {
        return this.props.senha;
    }

    public validateEmail() {
        let regex = new RegExp(/^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$^/g);
        if (!regex.test(this.props.email)) {
            throw new Error('Email inválido');
        }
    }

    public validateSenha() {
        let regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/g);
        // deve conter ao menos um dígito
        // deve conter ao menos uma letra minúscula
        // deve conter ao menos uma letra maiúscula
        // deve conter ao menos um caractere especial
        // deve conter ao menos 8 dos caracteres mencionados
        if (!regex.test(this.props.senha) || this.props.senha.length < 8) {
            throw new Error('Senha inválida');
        }
    }

}

