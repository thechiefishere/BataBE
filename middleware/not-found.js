const notFound = (req, res) => {
  res.status(400).send("The page you requested was not found");
};

module.exports = notFound;
