const mysql = require('mysql');

/* Create connection with database */
const connectionDB = mysql.createConnection({
    database: 'sneakerplacedb',
    host: 'localhost',
    user: 'root',
    password: 'JosBarros@7',
});

/* Connect with database */
connectionDB.connect( (error) => {
    if (error){
        console.log(`Connection failed! ${error}`);
    } else {
        console.log('Connected database!');
    }
});

module.exports = connectionDB;