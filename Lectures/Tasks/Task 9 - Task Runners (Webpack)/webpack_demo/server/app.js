const express = require('express');
const path = require('path');

const port = 8888;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.php')));

app.listen(port, () => console.log('Server is running on port ' + port));
