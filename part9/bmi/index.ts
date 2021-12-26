import express, { RequestHandler } from 'express';
import bmiRouter from './routers/bmi';
import exerciseRouter from './routers/exercises';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('<h1>Sandesh Learns TypeScript</h1>');
});

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.use('/bmi', bmiRouter);
app.use('/exercises', exerciseRouter);

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
