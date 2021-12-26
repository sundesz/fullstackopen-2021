import { Request, Response } from 'express';
import { calculateBmi } from '../bmiCalculator';
import { BmiInterface } from '../interface/bmi';

const parseBmiArguments = (req: Request): BmiInterface => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('malformatted parameters');
  }

  return {
    height: Number(height),
    weight: Number(weight),
  };
};

const bmiCalculator = (req: Request, res: Response) => {
  try {
    const { height, weight } = parseBmiArguments(req);

    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.json({ error: err.message });
    }
  }
};

export default { bmiCalculator };
