const route = require('express').Router();
const connectionDB = require('../database/database');

route.post('/', (request, response) => {
    const { email, password } = req.body;
    const verificarEmail = 'SELECT * FROM Administradores WHERE Email = ?';
    connectionDB.query(verificarEmail, [email], (error, result) => {
        if (error) {
            response.json({ mensagemErro: 'Problema no servidor, tente mais tarde!' });
        } else {
            if(result.length > 0) {
                if(email === result[0].email && passwordHash(password) === result[0].password){
                    request.session.utilizadorAutenticado = result[0];
                    response.json({ 
                        message: 'Seja bem-vindo à sua dashboard',
                        statusCode: 200,
                        session: request.session.utilizadorAutenticado
                    });
                } else {
                    response.json({ 
                        message: 'Email ou Password está errada!' 
                    });
                };
            } else {
                response.json({ 
                    message: 'Regista-te', 
                    statusCode: 401 
                });
            }
        };
    });
});
module.exports = route;