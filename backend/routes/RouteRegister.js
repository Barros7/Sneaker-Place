const route = require('express').Router();
const connectionDB = require('../database/database');

route.post('/register', (request, response) => {
    let { firstName, lastName, email, password } = request.body;
    
    const newUser = 'INSERT INTO Administradores (Nome, Sobrenome, Email, Password) VALUES ?';
    connectionDB.query(newUser, [firstName, lastName, email, password], (error, results) => {
        if (error) {
            console.log(`Error: ${error}`);
            response.json({ 
                message: error,
                statusCode: 500 
            });
        } else {
            console.log('Sucesso!');
            response.json({
                message: 'Utilizador criado com sucesso!',
                statusCode: 201
            });
        }
    });
});

module.exports = route;