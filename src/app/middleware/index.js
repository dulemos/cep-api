module.exports = (req) => {
  if (!req.params.cep) {
    return false;
  } else {
    const { cep } = req.params;
    return cep.length === 8;
  }
};
