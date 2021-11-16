const errorHandling = (err, _req, res) => {
  console.log(err, 'error handling');
  return res.status(err.status).json({ message: err.message });
};

module.exports = errorHandling; 