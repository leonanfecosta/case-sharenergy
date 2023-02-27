# Case SHARENERGY

Esse repositório foi criado para o desenvolvimento de uma aplicação full stack do desafio técnico para aplicação em uma vaga na SHARENERGY. Para o desenvolvimento deste aplicativo, foi usado Git, Node, Express, TypeScript, MongoDB, React, Eslint, Docker, Mocha e Chai.

[Explicação do projeto](#explica%C3%A7%C3%A3o-do-projeto) ●
[Instruções e Detalhes de funcionamento](#instruções-e-detalhes-de-funcionamento) ●
[Backend](#backend) ●
[Frontend](#frontend)

# Explicação do projeto

Construir uma aplicação web (frontend e backend) capaz de realizar a comunicação com APIs distintas, além de um CRUD. Ela contará, no frontend) com 5 páginas, sendo elas:

- Tela de login;

- Tela de Listagem de usuários provindos da API [Random User Generator](https://randomuser.me/);

- Tela onde o usuário escolhe um status HTTP e é retornada uma imagem da api [HTTP Cat](https://http.cat/) baseada nesse status;

- Tela onde é mostrada uma imagem aleatória de um cachorro provinda da API [Random Dog](https://random.dog/) juntamente com um botão para obter uma nova imagem;

- Tela onde é possível realizar um CRUD (Create, Read, Update, Delete) de usuários; 

No backend foi utilizado um banco não relacional, o MongoDB usando a arquitetura MSC onde temos 3 camadas que são Model, Service e Controller. Ele possui dois documentos, sendo um para gerenciar o usuário que está realizadno o login e outro para gerenciar o CRUD dos usuários.

O vídeo demonstrando e explicando a aplicação pode ser visto através do [link](https://youtu.be/X-PUiwQGTKM)

---

# Instruções e Detalhes de funcionamento

A aplicação usará 3 portas diferentes para rodas. O frontend rodará da porta 3000, o backend na porta 3001 e o banco de dados na porta 27017.

<details>
  <summary> <h3> Utilizando o docker </h3> </summary>

É recomendável a utilização do docker para rodar a aplicação na máquina local. 

Para começar, clone o repositório:

```
git clone  git@github.com:leonanfecosta/case-sharenergy.git
```

Entre no diretório da aplicação

```
cd desafio-sharenergy-2023-01
```

Entre na pasta do backend e faça as instalções das dependências
```
cd backend && npm install
```

Volte para raiz do projeto
```
cd ..
```

Entre na pasta do frontend e faça as instalações das dependências
```
cd frontend && npm install
```

Volte para a raiz do projeto

```
cd ..
```

Execute o docker-compose 

```
docker-compose up -d
```

Após a montagem dos container a aplicação já estará rodando nas portas indicadas acima.
 </details>

<details>
  <summary> <h3> Sem o docker </h3> </summary>

Para rodar a aplicação sem a utilização do docker, é necessário  ter instalado o Node e o mongoDB na maquina local. 

Para começar, clone o repositório:

```
git clone  git@github.com:leonanfecosta/desafio-sharenergy-2023-01.git
```

Entre no diretório da aplicação

```
cd desafio-sharenergy-2023-01
```

Entre na pasta do backend e instale as dependências e inicie a execução

```
cd backend && npm install && npm run dev
```

Volte para a raiz do projeto

```
cd ..
```

Entre na pasta do frontend e instale as dependências e incie a execução

```
cd frontend && npm install && npm start
```

Após realizar esses passos a aplicação já estará disponível nas portas indicadas.

 </details>
 
 <details>
  <summary> <h3> Informações sobre o funcionamento </h3> </summary>
Ao iniciar o serviço do backend, o script `migrate-mongo up` é executado, criando o usuário `desafiosharenergy` no banco de dados da aplicação. Este comando é importante pois é com esse usuário que será feito o login na aplicação pelo frontend. 

Ao utilizar a aplicação via docker, todo o processo é feito automaticamente não sendo necessário a realização de nenhum passo adicional do descrito acima. Porém, se estiver rodando a aplicação sem o uso do docker, é preciso modificar o arquivo `migrate-mongo-config` e substituir a url do mongodb.
 </details>

---

# Backend

Se a aplicação estiver em execução na maquina local é possível vizualizar toda a documentação da api por meio do [Swagger](http://localhost:3001/api-docs/), onde há a possibilidade, além de de visualizar as resquests e responses, de interagir com a API, podendo realizar todas as operações disponíveis direto do navegador.

Abaixo é possível visualizar todas as rotas da API, com todos os seus detalhes, porém não é possível nenhum tipo de interação direta.

## Rotas de Login

<details>
  <summary > Login </summary>

| Método | Funcionalidade                                                                                        | URL                         |
| ------ | ----------------------------------------------------------------------------------------------------- | --------------------------- |
| `POST` | Verificar de o usuário existe no documento de Login do banco de dados, autorizando o login se existir | http://localhost:3001/login |

Nessa requisição POST é necessário informar o seguinte JSON:

```json
"username": "Nome do Usuário",
"password": "senha_secreta", // a senha deve ter no mínimo 6 caracteres
```

Essa requisição POST tem a seguinte resposta: 

```json
{
"username": "Nome do Usuário",
"password": "92305f21d8281ac002904977d84c0b2a", // senha hasheada
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlc2FmaW9zaGFyZW5lcmd5IiwicGFzc3dvcmQiOiI5MjMwNWYyMWQ4MjgxYWMwMDI5MDQ5NzdkODRjMGIyYSIsImlhdCI6MTY3MzAzNDYyMywiZXhwIjoxNjczNjM5NDIzfQ.oBgKNbHmZLq_0KxLR1wlcgwv7n6Lp-0zEz4tMVsQMQM" // token JWT gerado
}
```

</details>

## Rotas de Usuário

<details>
  <summary > Register </summary>

| Método | Funcionalidade                              | URL                         |
| ------ | ------------------------------------------- | --------------------------- |
| `POST` | Cadastrar um novo usuário no banco de dados | http://localhost:3001/users |

Nessa requisição POST é necessário informar o seguinte JSON:

```json
{
  "name": "Nome do Usuário", // nome com no minimo 3 caracteres
  "email": "email@teste.com", // email do usuário tem que ser válido
  "phone": "(11) 99999-9999", // numero deve seguir esse formato
  "address": "Rua Benjamin Constant", // endereço com no minimo 5 caracteres
  "cpf": "xxx.xxx.xxx-xx" // cpf do usuário deve seguir esse formato
}
```

Essa requisição POST tem a seguinte resposta: 

```json
{
  "name": "Nome do Usuário",
  "email": "email@teste.com",
  "phone": "(11) 99999-9999",
  "address": "Rua Benjamin Constant", 
  "cpf": "xxx.xxx.xxx-xx",
  "_id": "63b880fdace804fed28065a2" // id gerado pelo MongoDB
}
```

</details>

<details>
  <summary > Read </summary>

| Método | Funcionalidade                                                              | URL                         |
| ------ | --------------------------------------------------------------------------- | --------------------------- |
| `GET`  | Recuperar as informações de todos os usuários cadastrados no banco de dados | http://localhost:3001/users |

Nessa requisição GET é retornada as seguintes informações

```json
[
  {
    "name": "Nome do Usuário",
    "email": "email@teste.com",
    "phone": "(11) 99999-9999",
    "address": "Rua Benjamin Constant", 
    "cpf": "xxx.xxx.xxx-xx",
    "_id": "63b880fdace804fed28065a2" // id gerado pelo MongoDB
  }
]
```

</details>

<details>
  <summary > Update </summary>

| Método | Funcionalidade                              | URL                             |
| ------ | ------------------------------------------- | ------------------------------- |
| `PUT`  | Atualiza os campos de um usuário específico | http://localhost:3001/users/:id |

Nessa requisição PUT é necessário informar o seguinte JSON além de passar o `_id` do usuário a ser alterado por meio da url:

```json
{
  "name": "Nome do Usuário", // nome com no minimo 3 caracteres
  "email": "email@teste.com", // email do usuário tem que ser válido
  "phone": "(11) 99999-9999", // numero deve seguir esse formato
  "address": "Rua Benjamin Constant", // endereço com no minimo 5 caracteres
  "cpf": "xxx.xxx.xxx-xx" // cpf do usuário deve seguir esse formato
}
```

Essa requisição PUT vai retornar os mesmos campos com as informações atualizadas, da seguinte forma:

```json
{
  "name": "Nome do Usuário", //campos com as informações atualizadas
  "email": "email@teste.com", //campos com as informações atualizadas
  "phone": "(11) 99999-9999", //campos com as informações atualizadas
  "address": "Rua Benjamin Constant", //campos com as informações atualizadas
  "cpf": "xxx.xxx.xxx-xx", //campos com as informações atualizadas
  "_id": "63b880fdace804fed28065a2"
}
```

</details>

<details>
  <summary > Delete </summary>

| Método   | Funcionalidade              | URL                             |
| -------- | --------------------------- | ------------------------------- |
| `Delete` | Apaga um usuário específico | http://localhost:3001/users/:id |

Nesta requisição é preciso passar o `_id` do usuário via parametro de URL. A reposta dessa requisição será as informações do usuário deletado:

```json
{
"name": "Nome do Usuário",
"email": "email@teste.com",
"phone": "(11) 99999-9999",
"address": "Rua Benjamin Constant", 
"cpf": "xxx.xxx.xxx-xx",
"_id": "63b880fdace804fed28065a2"
}
```

</details>

---

# Frontend
<details>
  <summary> <h3> Página de login </h3> </summary>
	
<p>O usuário é capaz de se autenticar utilizando o username desafiosharenergy e password sh@r3n3rgy, também, háa possibilidade do usuário utilizar o remember me para realizar logins automáticos, sem a necessidade de digitar username e password após o primeiro acesso</p>
	
<p align="center">
  <img src="https://github.com/leonanfecosta/desafio-sharenergy-2023-01/blob/leonan-fernandes-da-costa-tavares/frontend/images/Captura%20de%20tela%20de%202023-01-09%2012-31-36.png" alt="Desafio Sharenergy - Login"/>
</p>
	
</details>

<details>
  <summary> <h3> Página Random User </h3> </summary>
	
<p>Página principal que contem uma listagem de usuários gerada a partir da api Random User Generator, a lista contém a foto do usuário, nome completo, email, username e idade. Além disso, os requests são páginados e há uma search para buscar usuários por nome, email ou username</p>
	
<p align="center">
  <img src="https://github.com/leonanfecosta/desafio-sharenergy-2023-01/blob/leonan-fernandes-da-costa-tavares/frontend/images/Captura%20de%20tela%20de%202023-01-09%2012-32-25.png" alt="Desafio Sharenergy - Random User"/>
</p>
	
</details>

<details>
  <summary> <h3> Página HTTP Cats </h3> </summary>
	
<p>Usuário é capaz de selecionar um status code http qualquer, e, após a seleção, é retornada uma imagem da api HTTP Cat relacionada ao status escolhido, caso não exista tal imagem, é retornada uma imagem de not found</p>
	
<p align="center">
  <img src="https://github.com/leonanfecosta/desafio-sharenergy-2023-01/blob/leonan-fernandes-da-costa-tavares/frontend/images/Captura%20de%20tela%20de%202023-01-09%2012-32-31.png?raw=true" alt="Desafio Sharenergy - HTTP Cats"/>
</p>
	
</details>

<details>
  <summary> <h3> Página HTTP Cats </h3> </summary>
	
<p>Essa é uma página simples onde há um botão de refresh que, ao ser clicado, retorna uma imagem aleatória da api Random Dog;</p>
	
<p align="center">
  <img src="https://github.com/leonanfecosta/desafio-sharenergy-2023-01/blob/leonan-fernandes-da-costa-tavares/frontend/images/Captura%20de%20tela%20de%202023-01-09%2012-32-41.png?raw=true" alt="Desafio Sharenergy - Random Dog"/>
</p>
	
</details>

<details>
  <summary> <h3> Página HTTP Cats </h3> </summary>
	
<p>Página onde há uma lista de clientes, através da qual o usuário é capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro possui nome, email, telefone, endereço e cpf.</p>
	
<p align="center">
  <img src="https://github.com/leonanfecosta/desafio-sharenergy-2023-01/blob/leonan-fernandes-da-costa-tavares/frontend/images/Captura%20de%20tela%20de%202023-01-09%2012-43-40.png?raw=true" alt="Desafio Sharenergy - Users"/>
</p>
	
</details>
