# Motors Shop API

### A API foi desenvolvida com o intuito de gerenciar um e-commerce de venda e compra de carros.

## 1. Visão Geral

## Um pouco das tecnologias, bibliotecas e ferramentas utilizadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [zod](https://zod.dev/)
- [pg](https://www.npmjs.com/package/pg)
- [jsonwebtoken](https://www.npmjs.com/package/pg)
- [ts-node/ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [Regex for uuid](https://ihateregex.io/expr/uuid/)
- [draw.io](https://app.diagrams.net/)

## 2. Diagrama ER

Diagrama ER da API definindo as relações entre as entidades do banco de dados encontra-se no diretório:

../img/der.png

## 3. Instalação

Clone o projeto em sua máquina e instale as dependências com o comando:

```bash
# Instalação para yarn
yarn

# Instalação para npm
npm run install
```

## 3.1 Variáveis de ambiente e conexão com o banco de dados

Em seguida, crie um arquivo **.env**, copiando o formato abaixo:

```.env
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
SECRET_KEY=jwt_secret_key
EXPIRES_IN=jwt_expires_in
```
Substitua as credenciais pelos seus dados.

## 3.2 Migrações

Rode as migrações executando os seguintes comandos em seu terminal:

```bash
# caso tenha instalado yarn
yarn typeorm migration:run -d src/data-source.ts

# caso tenha instalado npm
npm run typeorm migration:run -- -d src/data-source
```

## 4. Inicializar o servidor

Rode o servidor com o seguinte comando:

```bash
# caso tenha instalado yarn
yarn dev

# caso tenha instalado npm
npm run dev
```

# 5. Rota para documentação

Após conectar-se ao banco de dados e rodar o servidor, consulte a documentação completa da API em:

https://localhost:3000/api-docs/
