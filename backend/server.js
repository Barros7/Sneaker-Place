const express = require('express');
const cors = require('cors');
const session = require('express-session');
const port = 8081;

const app = express();

/* Midllers */
app.use(cors());
app.use(session({
    secret: '45r6dfu07969gih',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

/* Import of routes */
app.use('/login', require('./routes/RouteLogin'));
app.use('/tenis', require('./routes/RouteTenis'));
app.use('/register', require('./routes/RouteRegister'));

app.listen(port, () => {
    console.log(`Server running on url: http://localhost:${port}`);
});