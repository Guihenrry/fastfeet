# Passo a passo para execultar o Backend 

**OBS:** Para utilizar este projeto será necessário um banco de dados postgres.  

### Instale dependência
```bash
$ yarn
```

### Criação do arquivo .env na raiz do projeto
```
# Secret do token de autenticação

SECRET=

# Credenciais do banco de dados

DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
```

### Execultar as migration 
É preciso execultar as migration para criar a estutura do banco de dados
```bash
$ yarn sequelize db:migrate
```

### Execultar as Seeds para criação de usuario admin
```bash
$ yarn sequelize db:seed:all
```

Essa seed vai criar no banco de dados um usuário com as seguintes credenciais e vai ser utilizado para acessar a aplicação frontend.
```
# Email
admin@fastfeet.com

# Senha
123456
```

### Execute o projeto na porta 3333
```bash
$ yarn dev
```

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=FastFeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2FGuihenrry%2Ffastfeet%2Fmaster%2Fbackend%2Finsomnia.json)

Feito com ♥ by Gui Henrry ✌
