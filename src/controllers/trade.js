const trade = require('../services/trade');

const create = async (req, res) => {
  const {id} = await trade.create(req.body);
  return res.status(201).json({id, ...req.body});
};

const findAll = async (_req, res) => {
  const response = await trade.findAll();
  return res.status(200).json(response);
};

const findById = async (req, res) => {
  const response = await trade.getById(req.params);
  return res.status(200).json(response);
};

const updateById = async (req, res) => {
  const response = await trade.updateById(req.body, req.params);
  return res.status(200).json(response);
};

const deleteById = async (req, res) => {
  await trade.deleteById(req.params);
  return res.status(204).end();
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};