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


function calcularRegra(sexo, idade, tempoContribuicao, categoria) {
  if (!sexo || idade == null || tempoContribuicao == null || !categoria) {
    return { erro: 'Dados incompletos' };
  }

  const regrasAplicaveis = [];

  const pontuacao = idade + tempoContribuicao;
  if ((sexo === 'masculino' && pontuacao >= 105) || (sexo === 'feminino' && pontuacao >= 100)) {
    regrasAplicaveis.push('Pontuação Progressiva');
  }

  if ((sexo === 'masculino' && tempoContribuicao >= 35) || (sexo === 'feminino' && tempoContribuicao >= 30)) {
    regrasAplicaveis.push('tempo Mínimo de Contribuição');
  }

  if (categoria === 'professor') {
    regrasAplicaveis.push('Regra Especial para Professores');
  }

  if (categoria === 'deficiencia') {
    regrasAplicaveis.push('Regra Especial para Pessoas com deficiência');
  }

  if ((sexo === 'masculino' && idade >= 65) || (sexo === 'feminino' && idade >= 62)) {
    regrasAplicaveis.push('Idade mínima para aposentadoria');
  }

  if (categoria === 'rural') {
    if (tempoContribuicao >= 15) {
      regrasAplicaveis.push('Aposentadoria Rural: tempo mínimo de contribuição reduzido');
    }
    if ((sexo === 'masculino' && idade >= 60) || (sexo === 'feminino' && idade >= 55)) {
      regrasAplicaveis.push('Aposentadoria Rural: idade mínima reduzida');
    }
  }

  if (categoria === 'programada') {
    if (idade >= 65) {
      regrasAplicaveis.push('Aposentadoria Programada: idade mínima de 65 anos');
    }
  }

  if (categoria === 'incapacidade') {
    if (tempoContribuicao >= 12) {
      regrasAplicaveis.push('Aposentadoria por Incapacidade: tempo mínimo reduzido');
    }
    regrasAplicaveis.push('Aposentadoria por Incapacidade: sem idade mínima');
  }

  return { regras: regrasAplicaveis };
}

exports.calcularRegra = calcularRegra;