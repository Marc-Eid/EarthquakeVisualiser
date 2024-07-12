const express = require('express');
const client = require('./elasticsearch/client');

const app = express();

const PORT = process.env.PORT || 3001;

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.listen(PORT, () => { console.log(`Server is listening at http://localhost:${PORT}`) });