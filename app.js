const express = require('express');
const app = express();
const PORTA = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const livrosBD = [
  { id: 1, titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', ano: 1605 },
  { id: 2, titulo: 'Guerra e Paz', autor: 'Liev Tolstói', ano: 1869 },
  { id: 3, titulo: 'Grande Sertão: Veredas', autor: 'João Guimarães Rosa', ano: 1956 },
];

app.get('/', (req, res) => {
  res.render('index', { livros: [], buscaTitulo: false, buscaAno: false });
});

app.get('/buscar', (req, res) => {
  const { titulo, ano } = req.query;
  let resultado = [];
  
  if (titulo) {
    resultado = livrosBD.filter(livro => livro.titulo && livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
  } else if (ano) {
    resultado = livrosBD.filter(livro => livro.ano === parseInt(ano));
  }

  if (resultado.length === 0) {
    res.render('index', { livros: [],mensagem: 'Nenhum livro encontrado para a busca realizada.' });
  } else {
    res.render('index', { livros: resultado });
  }

});

app.listen(PORTA, () => {
  console.log(`Servidor está rodando em http://localhost:${PORTA}`);
});
