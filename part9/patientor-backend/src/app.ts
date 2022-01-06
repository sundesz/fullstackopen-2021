import express, { Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import diagnosisRouter from './routers/diagnosis';
import patientRouter from './routers/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Sandesh Hyoju</h1>');
});

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('somebody ping here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
};
app.use(unknownEndpoint);

export default app;
