const chai = require('chai');
const sinon = require('sinon');
const app = require('../app.js');
const { getConnection } = require('./connectionMock.js');

const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /trade', () => {
  describe('endpoint POST /', () => {
    describe('Quando fazemos uma requisição mal sucedida', () => {
      describe('Quando os campos user, partner, pokemonList ou partnerPokemonList, não são informados', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/trade/').send({});
        });
        it('deve retornar com o status HTTP 400', () => {
          expect(response).to.have.status(400);
        });
        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });
    });
    describe('Quando conseguimos cadastrar uma nova troca com sucesso', () => {
      let connectionMock;
      let response;

      before(async () => {
        response = await chai.request(app).post('/trade')
          .send({user: "teste1",
          partner: "teste2",
          userPokemonList: [
            {
              "name": "mew",
              "base_experience": 250
            }
          ],
          partnerPokemonList: [
            {
              "name": "mewtwo",
              "base_experience": 245
            }
          ],
          isValid: true});
      });

      it('deve retornar com o status HTTP 201', () => {
        expect(response).to.have.status(201);
      });

      it('deve retornar um objeto no body com a key "user"', () => {
        expect(response.body).to.be.an('object').to.have.property('user');
      });

      it('deve retornar um objeto com os dados corretos da troca cadastrada', () => {
        expect(response.body).to.be.an('object').to.have
        .all.keys('partner', 'partnerPokemonList', 'userPokemonList', 'id', 'user', 'isValid');
      });
    });
  });
});


