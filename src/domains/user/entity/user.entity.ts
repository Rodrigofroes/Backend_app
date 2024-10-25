import bcrypt from 'bcrypt';

export type UserProps = {
    id: string,
    name: string,
    email: string,
    password: string
}

export class User {
    private constructor(private props: UserProps) { }

    public static async create(name: string, email: string, password: string) {
        const newPassword = await this.encryptPassword(password);

        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            password: newPassword
        });
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    public static async encryptPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
}