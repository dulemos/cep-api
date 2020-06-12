const request = require("node-fetch");

const getAddress = async (cepReceived, res) => {
    const data = await request(`https://viacep.com.br/ws/${cepReceived}/json/`);
    const jsonData = await data.json();

    const { cep, logradouro, localidade, uf } = jsonData;

    res.status(201).json({
        "cep": cep,
        "logradouro": logradouro,
        "localidade": localidade,
        "uf": uf
    })
};

module.exports = getAddress;
