import express from 'express';
import bmiRouter from './routers/bmi';
import exerciseRouter from './routers/exercises';

const app = express();

app.get('/', (_req, res) => {
  res.send('<h1>Sandesh Learns TypeScript</h1>');
});

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.use('/bmi', bmiRouter);
app.use('/exercises', exerciseRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
