# PokeTrader - Server

Este arquivo serve como guia básico para a parte back-end da aplicação full-stack PokeTrader.

Essa aplicação  consiste de um servidor NodeJS para acoplar uma API de trocas de pokemon e uma aplicação de Web Sockets que utiliza a biblioteca Socket.io como principal ferramenta.

Esse servidor é aproveitado por uma aplicação front-end que pode se conectar a uma sala de Web Sockets para realizar as trocas em tempo real, assim como persistir essas trocas a partir de requisições feitas para a API e sua rota trade. As trocas devem conter entre 1 e 6 pokemon para cada lado, assim como as informações de user e partner. Caso a diferença de *base_exp* entre ambas as partes esteja dentro do intervalo de 9% será considerada uma troca válida.

A aplicação teve o deploy feito na plataforma Heroku e o link é o seguinte:

https://poke-trader-server.herokuapp.com/trade

Através deste link é possível averiguar trocas feitas anteriormente.

Observação:

É possível que haja certa demora para a resposta do servidor pois o Heroku costuma hibernar a aplicação após determinado período de tempo. Basta esperar um pouco!

O banco de dados MongoDB teve o deploy feito na plataforma MongoDb Atlas, por questões de acessibilidade.

## Teste local

Para averiguação local basta clonar o repositório e na raiz do projeto instalar as dependências através do comando:
```sh
npm install
```
Em seguida, para iniciar a aplicação localmente é necessário ter a Porta 3001 livre e rodar o comando a seguir:
```sh
npm run dev
```
Com este comando o servidor será aberto localmente e através da biblioteca *nodemon* será permitido um *hot reload* de alterações, sem necessidade de desligamento do servidor.

Caso deseje é possível realizar testes de integração locais ao rodar o seguinte comando a partir da raíz do projeto:
```sh
npm run dev:test
```
## Observações
Em caso de irregularidades do servidor recomenda-se reiniciar e tentar novamente.
