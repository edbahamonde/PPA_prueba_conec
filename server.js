const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('[{name: string;cedula: string;email: string;persona: string;curso: string;}]'))

app.listen(3000);
console.log('Servidor en puerto 3000')