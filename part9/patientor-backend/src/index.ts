import express, { Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import diagnosisRouter from './routers/diagnoses';
import patientRouter from './routers/patients';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Sandesh Hyoju</h1>');
});

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('somebody ping here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
