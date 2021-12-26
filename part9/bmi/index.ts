import express from 'express';
import { calculateBmi, processWebBMIArguments } from './bmiCalculator';

const app = express();

app.get('/', (_req, res) => {
  res.send('<h1>Sandesh Learns TypeScript</h1>');
});

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = processWebBMIArguments(
      req.query.height as string,
      req.query.weight as string
    );

    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
