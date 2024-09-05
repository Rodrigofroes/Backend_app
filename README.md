# Backend_app


```

/backend_app
│   
│   Domain
│       Entity - Possui nossa entidade com todos os atributos, metodos e validações.
│       Gateway - Interface de saida da entity para um banco de dados por exemplo, ele vai descrever como vai ser os metodos.
│   
│   Usecases - Ele não sabe criar porem manda para o domain criar,  ele apenas controla o fluxo.
│       usecase.ts é a porta de entrada para acessar os casos de uso(contratos) criados em gateway.
│
│   Fluxo do projeto -
│       entrada de dados: interface -> controller -> use case -> entity, 
│       saida de dados: entity -> use case-> controller -> interface
│
├── /prisma
│   │   
│   └── schema.prisma
│
├── /src
│   ├── /domain
│   │   ├── /user
│   │   │   ├── entity
│   │   │   └── gateway
│   │   │
│   │   └── .ts
│   │
│   ├── /infra
│   │   ├── /express
│   │   │   ├── /routes
│   │   │   └── api.express.ts
│   │   ├── /repositories
│   │   │   └── /user
│   │   │
│   │   └── api.ts
│   │
│   ├── /package
│   │   │
│   │   └── prisma.ts
│   │
│   ├── /usecases
│   │   ├── /user
│   │   │   ├── create-user.usecase.ts
│   │   │   ├── delete-user.usecase.ts
│   │   │   ├── findbyid-user.usecase.ts
│   │   │   ├── list-user.usecase.ts
│   │   │   ├── update-user.usecase.ts
│   │   │
│   │   └── usecase.ts
│   │
│   └── main.ts
│
├── .env
├── .gitignore
├── guide.todo
├── package-lock.json
├── package.json
└── README.md
```