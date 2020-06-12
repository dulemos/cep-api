const router = require("express").Router();
const addressController = require("../controllers/addressController");
const cepValidation = require("../middleware");

router.get("/", (req, res) => {
  res.send({ message: "Welcome to cep api :D" });
});

router.get("/help", (req, res) => {
  res.status(201).send({
    request: {
      method: "GET",
      path: "/cep/00000000",
      body: {
        cep: "00000-000",
      },
    },
    response: {
      hello: "world",
    },
  });
});

router.get("/cep/:cep", (req, res) => {
  cepValidation(req)
    ? addressController(req.params.cep, res)
    : res.status("406").send("CEP Inválido");
});

module.exports = router;
