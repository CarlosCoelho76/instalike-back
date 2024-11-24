import express from 'express';
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';
import cors from 'cors';

const corsOptions = {
  origin:'http://localhost:8000', 
  optionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos enviados via upload
const storage = multer.diskStorage({
  // Define a pasta de destino para os arquivos salvos.
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // '/uploads/' é a pasta de destino
  },
  // Define o nome do arquivo salvo.
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utiliza o nome original do arquivo
  }
});

// Define a instância do middleware multer com o armazenamento configurado.
const upload = multer({ storage: storage });

// Define a rota para uploads no sistema operacional Windows (./uploads)
// Para Linux ou Mac, a configuração pode ser simplificada (sem ./uploads)
// const upload = multer({ dest: './uploads', storage }) // Linux ou Mac

// Função que define as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor receba dados no formato JSON nas requisições.
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota GET para listar todos os posts (provavelmente implementada em postsController.js)
  app.get('/posts', listarPosts);

  // Rota POST para criar um novo post (provavelmente implementada em postsController.js)
  app.post('/posts', postarNovoPost);

  // Rota POST para upload de imagens
  // Utiliza o middleware 'upload.single('imagem')' para processar um único arquivo chamado 'imagem'
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/upload/:id', atualizarNovoPost)
};

// Exporta a função 'routes' para ser utilizada em outro arquivo
export default routes;

