const express = require("express");
const cors = require('cors');
var app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Lojinha online (backend) - ITE ARTIN - 2021.</h1>");
});

require("./controllers/login")(app);

const middleware = require('./middleware/autenticar');
app.use(middleware);

require("./controllers/usuarios")(app);
require("./controllers/produtos")(app);

app.use((req, res) => {
    res.send("Página não encontrada");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Servidor online");
});