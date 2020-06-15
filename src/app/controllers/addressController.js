const request = require("node-fetch");
const {Address} = require("../models")

const getAddress = async (cepReceived, res) => {
    cepReceived = cepAddDash(cepReceived)
    let addressInfo = await Address.findOne({where: {"cep": cepReceived}});
    if (addressInfo) {
        res.status(201).json({
            "cep": addressInfo.cep,
            "logradouro": addressInfo.logradouro,
            "localidade": addressInfo.localidade,
            "uf": addressInfo.uf
        })
    } else {
        const data = await request(`https://viacep.com.br/ws/${cepReceived}/json/`);
        const jsonData = await data.json();
        if(jsonData.erro){
            res.status(406).send({erro: "O CEP enviado é inexistente."});
        }else{
            const { cep, logradouro, localidade, uf, complemento, bairro, unidade, ibge, gia } = jsonData;
    
            const newAddress = await Address.create({"cep": cep, "logradouro": logradouro, "uf": uf, "complemento": complemento, "bairro": bairro, "localidade": localidade, "unidade": unidade, "ibge": ibge, "gia": gia});
    
            const { dataValues } = newAddress;
    
            res.status(201).send({
                "cep": dataValues.cep,
                "logradouro": dataValues.logradouro,
                "localidade": dataValues.localidade,
                "uf": dataValues.uf
            })
        }
    }
};

const cepAddDash = (cep) => {
    return cep.substr(0,5)+"-"+cep.substr(5)
}


module.exports = getAddress;
