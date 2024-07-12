const express = require('express');
const client = require('./elasticsearch/client');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

const data = require('./routes/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use('/earthquakes', require('./routes/earthquakes'));

app.listen(PORT, () => { console.log(`Server is listening at http://localhost:${PORT}`) });