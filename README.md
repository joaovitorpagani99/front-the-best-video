# The Best Video

Bem-vindo ao **The Best Video**, uma aplicação web para assistir, votar e gerenciar vídeos. Este projeto foi desenvolvido utilizando React, Vite, e outras tecnologias modernas.

## Índice

- [The Best Video](#the-best-video)
  - [Índice](#índice)
  - [Descrição](#descrição)
  - [Instalação](#instalação)
  - [Uso](#uso)
    - [Login](#login)
    - [Cadastro](#cadastro)
    - [Dashboard](#dashboard)
    - [Administração](#administração)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Funcionalidades](#funcionalidades)

## Descrição

O **The Best Video** é uma plataforma onde os usuários podem assistir vídeos, votar nos seus favoritos e, para administradores, adicionar e gerenciar vídeos e usuários. A aplicação oferece uma interface amigável e responsiva, proporcionando uma experiência agradável para os usuários.

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/the-best-video.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd the-best-video
    ```

3. Instale as dependências:
    ```sh
    npm install
    ```

4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```

5. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

## Uso

Após iniciar o servidor de desenvolvimento, você pode acessar a aplicação no seu navegador através do endereço `http://localhost:3000`.

### Login

- Acesse a página de login e insira suas credenciais para entrar.
- Credenciais padrão de administrador:
  - **Email**: `admin@admin.com`
  - **Senha**: `admin`

### Cadastro

- Caso não tenha uma conta, acesse a página de cadastro e crie uma nova conta.

### Dashboard

- Após o login, você será redirecionado para o dashboard onde poderá assistir e votar nos vídeos.

### Administração

- Usuários com privilégios de administrador podem acessar o painel de administração para gerenciar vídeos e usuários.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento web.
- **Axios**: Cliente HTTP baseado em Promises para o navegador e node.js.
- **Bootstrap**: Framework CSS para desenvolvimento responsivo e mobile-first.
- **React Toastify**: Biblioteca para exibir notificações toast.
- **Framer Motion**: Biblioteca para animações em React.
- **PropTypes**: Biblioteca para checagem de tipos em componentes React.

## Funcionalidades

- **Autenticação**: Login e cadastro de usuários.
- **Gerenciamento de Vídeos**: Adicionar, excluir e listar vídeos.
- **Votação**: Votar nos vídeos favoritos.
- **Administração**: Gerenciamento de usuários e vídeos por administradores.
- **Notificações**: Exibição de notificações toast para feedback do usuário.

