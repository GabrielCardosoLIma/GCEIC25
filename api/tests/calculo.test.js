const { calcularAposentadoria } = require('../routes/calculoRoute');

describe('Função calcularAposentadoria', () => {
  test('Mulher que já pode se aposentar', () => {
    const resultado = calcularAposentadoria(62, 15, 'F');
    expect(resultado.podeAposentar).toBe(true);
    expect(resultado.mensagem).toBe('Você já pode se aposentar.');
  });

  test('Homem que já pode se aposentar', () => {
    const resultado = calcularAposentadoria(65, 15, 'M');
    expect(resultado.podeAposentar).toBe(true);
    expect(resultado.mensagem).toBe('Você já pode se aposentar.');
  });

  test('Mulher que não pode se aposentar por idade', () => {
    const resultado = calcularAposentadoria(60, 15, 'F');
    expect(resultado.podeAposentar).toBe(false);
    expect(resultado.mensagem).toContain('2 ano(s) de idade');
  });

  test('Homem que não pode se aposentar por contribuição', () => {
    const resultado = calcularAposentadoria(65, 10, 'M');
    expect(resultado.podeAposentar).toBe(false);
    expect(resultado.mensagem).toContain('5 ano(s) de contribuição');
  });

  test('Mulher que não pode se aposentar por idade e contribuição', () => {
    const resultado = calcularAposentadoria(60, 10, 'F');
    expect(resultado.podeAposentar).toBe(false);
    expect(resultado.mensagem).toContain('2 ano(s) de idade');
    expect(resultado.mensagem).toContain('5 ano(s) de contribuição');
  });

  test('Idade negativa', () => {
    const resultado = calcularAposentadoria(-1, 15, 'F');
    expect(resultado.podeAposentar).toBe(false);
  });

  test('Contribuição negativa', () => {
    const resultado = calcularAposentadoria(62, -5, 'M');
    expect(resultado.podeAposentar).toBe(false);
  });

  test('Sexo inválido', () => {
    const resultado = calcularAposentadoria(65, 15, 'X');
    expect(resultado.podeAposentar).toBe(true);
  });
});
