const express = require('express');
const router = express.Router();

function calcularAposentadoria(idade, contribuicao, sexo) {
  const idadeMinima = sexo === 'F' ? 62 : 65;
  const contribuicaoMinima = 15;

  if (idade >= idadeMinima && contribuicao >= contribuicaoMinima) {
    return {
      podeAposentar: true,
      mensagem: "Você já pode se aposentar."
    };
  } else {
    const faltaIdade = Math.max(idadeMinima - idade, 0);
    const faltaContribuicao = Math.max(contribuicaoMinima - contribuicao, 0);

    let mensagens = [];

    if (faltaIdade > 0) {
      mensagens.push(`${faltaIdade} ano(s) de idade`);
    }

    if (faltaContribuicao > 0) {
      mensagens.push(`${faltaContribuicao} ano(s) de contribuição`);
    }

    return {
      podeAposentar: false,
      mensagem: `Você ainda não pode se aposentar. Faltam ${mensagens.join(' e ')}.`
    };
  }
}

router.post('/calculo', (req, res) => {
  const { idade, contribuicao, sexo } = req.body;

  if (
    typeof idade !== 'number' ||
    typeof contribuicao !== 'number' ||
    typeof sexo !== 'string' ||
    !['M', 'F'].includes(sexo) ||
    idade <= 0 ||
    contribuicao < 0
  ) {
    return res.status(400).json({
      erro: true,
      mensagem: 'Por favor, envie idade, contribuição válidos e sexo ("M" ou "F").'
    });
  }

  const resultado = calcularAposentadoria(idade, contribuicao, sexo);
  return res.status(200).json(resultado);
});

module.exports = { router, calcularAposentadoria };

// sdsd
