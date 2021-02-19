# Desafio

Projeto feito para **processo seletivo**


- [Iniciando aplicação com Docker](#Iniciando-aplicação-com-Docker)
    - [Subindo as imagens](#Subindo-as-imagens)
- [Iniciando aplicação com VS, VS Code e SQL LocalDB](#Iniciando-aplicação-com-VS,-VS-Code-e-SQL-LocalDB)
    - [Projeto Back-end](#Projeto-Back-end)
    - [Projeto Front-end](#Projeto-Front-end)
    - [Dependências](#Dependências)
- [Uso da aplicação](#Uso-da-aplicação)


# Iniciando aplicação com Docker

## Subindo as imagens

 1. **Certifique-se de ter instalado em sua máquina o Docker.**
 2. **Abra seu command (bash, powershell, etc...) de preferência.**
 3. **Navegue até a pasta docker do projeto (../desafio/docker).**
 4. **Rode o comando: docker-compose up**
 5. **Aguarde até que ele suba as 3 imagens. (SQL, API, Front).**
 6. **Acesse em sua máquina pelo browser: localhost**


# Iniciando aplicação com VS, VS Code e SQL LocalDB

## Projeto Back-end

Acesse a solução do projeto pelo **Visual Studio**. Clique com o botão direito do mouse na solução e clique em **Restore Nuget Packages**. Isso fará com que todas as dependências sejam instaladas.

No **Package Manager Console** rode os seguintes comandos:

 1. **Update-Database -Context MeuDbContext**
 2. **Update-Database -Context ApplicationDbContext**

Isso criará o **bando de dados**

Aplicação estará pronta para iniciar.

## Projeto Front-end

Acesse o projeto pelo **VS Code**. Na pasta do projeto rode o seguinte comando: **npm install**. Isso fará com que as dependências sejam instaladas.
Para rodar o projeto rode o seguinte comando: **ng serve -o**. Lembre-se de estar com o projeto back-end rodando.

## Dependências

Certifique-se de ter instalado em sua máquina as seguintes aplicações:

 1. SQL LocalDB - Com uma instância **mssqllocaldb**.
 2. NodeJs 14+
 3. Angular 9+
 4. SDK .Core 3.1


# USO
Para usar a aplicação. Registre um usuário no botão que se encontra do lado direito superior.
Examplo de registro de usuário:

 1. **usuario: teste@teste.com.br**
 2. **senha: Teste@123**

Após o registro será redirecionado para tela Home já Logado.

No Menu superior clique em Amigos ou Jogos. Lá você poderá adicionar, editar e excluir registros.
