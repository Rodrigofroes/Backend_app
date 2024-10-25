export type CategoryProps = {
    id: string;
    description: string;
}

export class Category {
    private constructor(
        private props: CategoryProps
    ){}

    public static create(description: string){
        return new Category({
            id: crypto.randomUUID().toString(),
            description
        });
    }

    public static with(props: CategoryProps){
        return new Category(props);
    }

    get id(){
        return this.props.id;
    }

    get description(){
        return this.props.description;
    }
}