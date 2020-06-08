<h1 align="center">
  <img alt="Fastfeet" src="../.github/logo.svg" width="250px" />
</h1>

<h3 align="center">
  API REST Node.js para o aplicativo fastfeet
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Guihenrry/fastfeet?color=%237D40E7">

  <a href="https://www.linkedin.com/in/guilhermehenrry/">
    <img alt="Made by Gui Henrry" src="https://img.shields.io/badge/made%20by-Gui%20Henrry-%237D40E7">
  </a>

  <img alt="License" src="https://img.shields.io/badge/licence-MIT-%237D40E7">
</p>


# Como utilizar

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

---

Feito com 💜 by [Gui Henrry](https://www.linkedin.com/in/guilhermehenrry/) ✌
