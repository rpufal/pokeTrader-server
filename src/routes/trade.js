const express = require('express');
const rescue = require('express-rescue');
const {create, findAll, findById, updateById, deleteById} = require('../controllers/trade');

const route = express.Router();


route.post('/', rescue(create));
route.get('/', rescue(findAll));
route.get('/:id', rescue(findById));
route.put('/:id', rescue(updateById));
route.delete('/:id', rescue(deleteById));

module.exports = route;
