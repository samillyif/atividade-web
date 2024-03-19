// Importa o módulo express
const express = require('express');
// Inicializa o aplicativo express
const app = express();
// Define a porta em que o servidor vai rodar
const PORTA = 4000;

// Define o motor de visualização como EJS
app.set('view engine', 'ejs');
// Define a pasta 'public' como a pasta para arquivos estáticos
app.use(express.static('public'));

// Define um array de objetos representando o banco de dados de livros
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

// Rota inicial que renderiza a página index.ejs com a lista de livros
app.get('/', (req, res) => {
  res.render('index', { livros: livrosBD, mensagem: null, resultados: null });
});

// Rota para buscar livros por título
app.get('/buscar', (req, res) => {
  // Extrai o parâmetro 'titulo' da query string da URL
  const { titulo } = req.query;
  // Inicializa um array para armazenar os resultados da busca
  let resultado = [];
  
  // Verifica se foi fornecido um título para buscar
  if (titulo) {
    // Filtra os livros cujo título contenha o texto fornecido (case-insensitive)
    resultado = livrosBD.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
  }

  // Renderiza a página index.ejs com a lista de livros, mensagem de erro (se aplicável) e resultados da busca
  if (resultado.length === 0) {
    res.render('index', { livros: livrosBD, mensagem: 'Nenhum livro encontrado para a busca realizada.', resultados: null });
  } else {
    res.render('index', { livros: livrosBD, mensagem: null, resultados: resultado });
  }
});

// Inicia o servidor na porta especificada e exibe uma mensagem no console
app.listen(PORTA, () => {
  console.log(`Servidor está rodando em http://localhost:${PORTA}`);
});
