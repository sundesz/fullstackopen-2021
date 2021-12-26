import { Request, RequestHandler } from 'express';
import { calculateExercises } from '../exerciseCalculator';
import { ExerciseArgumentsInterface } from '../interface/exercises';

const parseExercisesArguments = (req: Request): ExerciseArgumentsInterface => {
  const { target, exerciseHour } = req.query as {
    target: unknown;
    exerciseHour: unknown[];
  };

  if (!target || !exerciseHour) {
    throw new Error('parameters missing');
  }

  if (isNaN(Number(target)) || exerciseHour.filter(isNaN).length) {
    throw new Error('malformatted parameters');
  }

  return {
    target: Number(target),
    exerciseHour: exerciseHour.map(Number),
  };
};

const exerciseCalculator: RequestHandler = (req, res) => {
  try {
    const { target, exerciseHour } = parseExercisesArguments(req);
    res.json(calculateExercises(target, exerciseHour));
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.json({ error: e.message });
    }
  }
};

export default { exerciseCalculator };
