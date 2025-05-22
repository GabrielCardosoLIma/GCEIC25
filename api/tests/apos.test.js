const { calcularAposentadoria } = require('../controllers/aposController');

const request = require('supertest');
const app = require('../server');

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

const {calcularRegra} = require('../controllers/aposController');

describe('Função calcularRegra', () =>{
  test('Categoria professor', () =>{
    const resultado = calcularRegra('feminino',50,30,'professor')
  });

  test('Categoria deficiencia', () =>{
    const resultado = calcularRegra('masculino',50,40,'deficiencia')
  });

  test('Categoria rural maior tempo Contribuição', () =>{
    const resultado = calcularRegra('feminino',70,30,'rural')
  });

  test('Categoria rural menor tempo Contribuição', () =>{
    const resultado = calcularRegra('masculino',60,10,'rural')
  });

  test('Categoria programada maior que 65anos', () =>{
    const resultado = calcularRegra('feminino',67,30,'programada')
  });

  test('Categoria programada menor que 65anos', () =>{
    const resultado = calcularRegra('feminino',50,30,'programada')
  });

  test('Categoria incapacidade reduzida', () =>{
    const resultado = calcularRegra('masculino',62,15,'incapacidade')
  });

  test('Categoria incapacidade sem idade minima', () =>{
    const resultado = calcularRegra('masculino',20,10,'incapacidade')
  });

  test('Pontuação Progressiva', () =>{
    const resultado = calcularRegra('feminino',60,40,'comum')
  });

  test('Tempo minimo de contribuição', () =>{
    const resultado = calcularRegra('feminino',50,31,'comum')
  });

  test('Idade minima (geral)', () =>{
    const resultado = calcularRegra('masculino',65,10,'comum')
  });

  test('Pontuação Progressiva (insuficiente)', () =>{
    const resultado = calcularRegra('masculino',50,30,'comum')
  });

  test('Tempo minimo (insuficiente)', () =>{
    const resultado = calcularRegra('feminino',55,25,'comum')
  });
});

// ----------------- TESTES FUNCIONAIS -----------------
describe('Testes Funcionais - Endpoint /apos/calculo', () => {
  test('Deve calcular aposentadoria corretamente para mulher', async () => {
    const res = await request(app)
      .post('/api/calculo')
      .send({ idade: 62, contribuicao: 15, sexo: 'F' });

    expect(res.statusCode).toBe(200);
    expect(res.body.podeAposentar).toBe(true);
    expect(res.body.mensagem).toBe('Você já pode se aposentar.');
  });

  test('Deve calcular aposentadoria corretamente para homem', async () => {
    const res = await request(app)
      .post('/api/calculo')
      .send({ idade: 65, contribuicao: 15, sexo: 'M' });

    expect(res.statusCode).toBe(200);
    expect(res.body.podeAposentar).toBe(true);
  });

  test('Deve retornar mensagem de não apto quando falta idade', async () => {
    const res = await request(app)
      .post('/api/calculo')
      .send({ idade: 60, contribuicao: 15, sexo: 'F' });

    expect(res.statusCode).toBe(200);
    expect(res.body.podeAposentar).toBe(false);
    expect(res.body.mensagem).toContain('2 ano(s) de idade');
  });

  test('Deve retornar erro quando dados inválidos são enviados', async () => {
    const res = await request(app)
      .post('/api/calculo')
      .send({ idade: 'abc', contribuicao: -5, sexo: 'X' });

    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe(true);
    expect(res.body.mensagem).toBe('Por favor, envie idade, contribuição válidos e sexo ("M" ou "F").');
 });
});
