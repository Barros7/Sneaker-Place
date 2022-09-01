const rota = require('express').Router();
const conexaoBaseDados = require('../database/database');

/* Add tenis */
rota.post('/add', (request, response) => {
    const { mark, price } = request.body;
    
    const addToFavorite = 'INSERT INTO Tenis (Marca, Preco) VALUES ?';
    conexaoBaseDados.query(addToFavorite, [mark, price], (erro, resultado) => {
        if(erro){
            console.log(erro);
            response.json({ mensagemErro: 'Erro ao tentar adicionar tenis do favoritos' });
        }
        response.json({ mensagemSucesso: 'Tenis adicionado com sucesso!' });
    });
});

rota.get('/list', (request, response) => {
    const listTenis = 'SELECT * FROM Tenis';

    conexaoBaseDados.query(listTenis, (error, resultado) => {
        if (error) {
            response.json({ 
                mensagemErro: 'Problema no servidor, erro ao carregar os dados',
                statusCode: 500
            });
        } else {
            if(result.length > 0) {
                response.json({ 
                    message: resultado, 
                    statusCode: resultado 
                });
            } else {
                response.json({ 
                    message: "Nenhum tenis encontrado!", 
                    statusCode: 501, 
                });
            }
        }
    });
});

rota.put('/update/:(id)', (request, response) => {
    const id = request.params.id;
    const { nome } = req.body;

    const updateData = 'UPDATE Tenis SET Nome = ?, WHERE Id_Tenis = ?';
    conexaoBaseDados.query(updateData, [nome, id], (erro, resultado) => {
        if(erro){
            console.log(erro);
            response.json({ mensagemErro: 'Erro ao tentar atualizar os dados' });
        }
        response.json({ mensagemSucesso: 'Dados atualizados com sucesso!' });
    });
});

rota.delete('/delete/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const deleteData = 'DELETE FROM Tenis WHERE Id_Tenis = ?';
    conexaoBaseDados.query(deleteData, [id], (erro, resultado) => {
        if(erro){
            console.log(erro);
            response.json({ mensagemErro: 'Erro ao tentar eliminar Administrador' });
        }
        response.json({ mensagemSucesso: 'Administrador eliminado com sucesso!' });
    });
});

/* Add favorites */
rota.post('/favorite/add/:id', (request, response) => {
    const id = parseInt(request.params.id);
    
    const addToFavorite = 'INSERT INTO Tenis WHERE Id_Tenis = ?';
    conexaoBaseDados.query(addToFavorite, [id], (erro, resultado) => {
        if(erro){
            console.log(erro);
            response.json({ mensagemErro: 'Erro ao tentar adicionar tenis do favoritos' });
        }
        response.json({ mensagemSucesso: 'Tenis adicionado com sucesso!' });
    });
});

/* Delete favorites */
rota.delete('/favorite/delete/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const deleteToFavorite = 'DELETE FROM TenisFavorite WHERE Id_Tenis = ?';
    conexaoBaseDados.query(deleteToFavorite, [id], (erro, resultado) => {
        if(erro){
            console.log(erro);
            response.json({ mensagemErro: 'Erro ao tentar eliminar tenis dos favoritos' });
        }
        response.json({ mensagemSucesso: 'Tenis eliminado com sucesso!' });
    });
});

module.exports = rota;