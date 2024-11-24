import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js"
import { ObjectId } from "mongodb";

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instabytes'.
    const db = conexao.db('imersao-instabytes')
    // Seleciona a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection('posts')
    // Executa a operação de busca em todos os documentos da coleção e retorna um array com os resultados.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}