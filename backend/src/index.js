import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from 'config';
import search from '../routes/Search';
import home from '../routes/Home';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api/search', search);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Cameo Search Server: ' + config.get('search.host'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => console.log(`listening on: ${PORT}`));
