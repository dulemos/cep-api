module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    cep: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    localidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    unidade: DataTypes.STRING,
    ibge: DataTypes.STRING,
    gia: DataTypes.STRING,
  });
  return Address;
};
