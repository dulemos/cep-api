const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");
const { Address } = require("../../src/app/models");

describe("Address", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should return address info when cep is valid", async () => {
    const cep = "03063000";

    const response = await request(app).get(`/cep/${cep}`);
    expect(response.status).toBe(201);
  });

  it("Should return status 406 when cep is not valid", async () => {
    const response = await request(app).get("/cep/123");
    expect(response.status).toBe(406);
  });

  it("Should return status 406 when cep doesnt exist", async () => {
    const response = await request(app).get("/cep/12345678");
    expect(response.status).toBe(406);
  })

  it("Should return correct address", async () => {
    const response = await request(app).get("/cep/04571010");
    const result = {
      cep: "04571-010",
      logradouro: "Avenida Engenheiro Luiz Carlos Berrini",
      localidade: "São Paulo",
      uf: "SP",
    };
    expect(response.body).toStrictEqual(result);
  });

  it("Should save the address in database for future requests", async () => {
    const response = await request(app).get("/cep/04571010");
    const data = await Address.findOne({where: {"cep": response.body.cep}});
    expect(data.dataValues.cep).toBe(response.body.cep);
  });
});
