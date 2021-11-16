const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({  user, partner, userPokemonList, partnerPokemonList, isValid }) => {
  const tradeCollection = await connection()
    .then((db) => db.collection('trade'));
  const { insertedId } = await tradeCollection
  .insertOne({user, partner, userPokemonList, partnerPokemonList, isValid});

  return {
    id: insertedId,
  };
};

const findAll = async () => {
  const tradeCollection = await connection()
    .then((db) => db.collection('trade'));

  const tradeArray = await tradeCollection.find().toArray();

  return tradeArray;
};

const findById = async (id) => {
  const tradeCollection = await connection()
    .then((db) => db.collection('trade'));
  const trade = await tradeCollection.findOne(new ObjectId(id));
  return trade;
};

const updateById = async ({  user, partner, userPokemonList, partnerPokemonList, isValid}, id) => {
  const tradeCollection = await connection()
    .then((db) => db.collection('trade'));

  await tradeCollection
    .updateOne({ _id: ObjectId(id) }, { $set: {  user, partner, userPokemonList, partnerPokemonList, isValid } });
  return { _id: id, user, partner, userPokemonList, partnerPokemonList, isValid };
};


const deleteById = async (id) => {
  const tradeCollection = await connection()
    .then((db) => db.collection('trade'));

  const result = await tradeCollection
    .deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};