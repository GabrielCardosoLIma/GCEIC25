const express = require("express");
const router = express.Router();

const { calcularAposentadoria } = require("../controllers/aposController");
const { calcularRegra } = require("../controllers/aposController");

router.post("/calculo", (req, res) => {
  const { idade, contribuicao, sexo } = req.body;

  if (
    typeof idade !== "number" ||
    typeof contribuicao !== "number" ||
    typeof sexo !== "string" ||
    !["M", "F"].includes(sexo) ||
    idade <= 0 ||
    contribuicao < 0
  ) {
    return res.status(400).json({
      erro: true,
      mensagem:
        'Por favor, envie idade, contribuição válidos e sexo ("M" ou "F").',
    });
  }

  const resultado = calcularAposentadoria(idade, contribuicao, sexo);
  return res.status(200).json(resultado);
});

router.post("/regras", (req, res) => {
  try {
    const { sexo, idade, contribuicao, categoria } = req.body;

    if (
      typeof idade !== "number" ||
      typeof contribuicao !== "number" ||
      typeof sexo !== "string" ||
      typeof categoria !== "string" ||
      !["M", "F"].includes(sexo) ||
      idade <= 0 ||
      contribuicao < 0
    ) {
      return res.status(400).json({
        erro: true,
        mensagem:
          'Por favor, envie idade, contribuição, categoria válidos e sexo ("M" ou "F").',
      });
    }

    const regras = calcularRegra(sexo, idade, contribuicao, categoria);

    return res.status(200).json(regras);
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: error.message,
    });
  }
});

module.exports = router;
