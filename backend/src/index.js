import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import talentData from './TALENT_DATA.json';

const PORT = 9090;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * This is an Express route handler
 * https://expressjs.com/
*/
app.get('/', (req, res) => {
  res.send('This is some data from the server. Please read README.md for full instructions before beginning.');
});

/**
* Implement a new endpoint HTTP GET /search that accepts a query, and returns a filtered list of talent based on that query.
* A user should be able to search by username, name, or category.
* Note: A list of Cameo talent is provided in TALENT_DATA.json
*/
app.get('/search', (req, res) => {
  res.send('Return your search results here');
});

app.listen(PORT);

console.log(`listening on: ${PORT}`);
