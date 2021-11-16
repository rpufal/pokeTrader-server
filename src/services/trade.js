const Joi = require('joi');
const trade = require('../models/trade');


const tradeSchema = Joi.object({
  user: Joi.string().required(),
  partner: Joi.string().required(),
  userPokemonList: Joi.array().required(),
  partnerPokemonList: Joi.array().required(),
  isValid: Joi.boolean().required()
});


const validateError = (status, message) => ({ status, message });

const create = async ({  user, partner, userPokemonList, partnerPokemonList, isValid }) => {
  const { error } = tradeSchema.validate({  user, partner, userPokemonList, partnerPokemonList, isValid });
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  const idObject = await trade.create({  user, partner, userPokemonList, partnerPokemonList, isValid });
  return idObject;
};

const findAll = async () => {
  const tradeArray = await trade.findAll();
  return tradeArray;
};

const findById = async ({id}) => {
  const trade = await trade.findById({id});
  return trade;
};


const updateById = async (tradeInfo,{id}) => {
  const tradeUpdated = await trade.updateById(tradeInfo, id);
  return tradeUpdated;
};

const deleteById = async (id) => {
  await trade.deleteById(id);
  return true;
};



module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};