// controllers/aposController.js

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

exports.calcularAposentadoria = calcularAposentadoria;
