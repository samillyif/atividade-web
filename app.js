const express = require('express');
const app = express();
const PORTA = 4000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const livrosBD = [
  { id: 1, titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', ano: 1605 },
  { id: 2, titulo: 'Guerra e Paz', autor: 'Liev Tolstói', ano: 1869 },
  { id: 3, titulo: 'Alice no país das maravilhas', autor: 'Lewis Carroll', ano: 2010},
  { id: 4, titulo: 'A Revolução dos Bichos', autor: 'George Orwell', ano: 1945 },
  { id: 5, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', ano: 1937 },
  { id: 6, titulo: 'Cem anos de solidão', autor: 'Gabriel García Márquez', ano: 1967 },
  { id: 7, titulo: 'Harry Potter e a Pedra Filosofal', autor: ' J.K. Rowling ', ano:1997},
  { id: 8, titulo: 'A Culpa é das Estrelas', autor: 'John Green', ano:  2012 },
  { id: 9, titulo: 'A Garota no Trem', autor: 'Paula Hawkins', ano:  2015 },
  { id: 10, titulo: 'O Diário de Anne Frank', autor: 'Anne Frank', ano:  1947 },

];

app.get('/', (req, res) => {
  res.render('index', { livros: livrosBD, mensagem: null, resultados: null }); // Passando todos os livros e nenhum resultado para o template
});

app.get('/buscar', (req, res) => {
  const { titulo, ano } = req.query;
  let resultado = [];
  
  if (titulo) {
    const livroEncontrado = livrosBD.find(livro => livro.titulo && livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    resultado = livroEncontrado ? [livroEncontrado] : []; // Se encontrar o livro, adiciona à lista de resultados
  } else if (ano) {
    resultado = livrosBD.filter(livro => livro.ano === parseInt(ano));
  }

  if (resultado.length === 0) {
    res.render('index', { livros: livrosBD, mensagem: 'Nenhum livro encontrado para a busca realizada.', resultados: null }); // Passando todos os livros e nenhum resultado para o template
  } else {
    res.render('index', { livros: livrosBD, mensagem: null, resultados: resultado }); // Passando todos os livros e os resultados da busca para o template
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor está rodando em http://localhost:${PORTA}`);
});
