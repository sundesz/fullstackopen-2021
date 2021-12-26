import { Request, RequestHandler } from 'express';
import { calculateExercises } from '../exerciseCalculator';
import { ExerciseArgumentsInterface } from '../interface/exercises';

const parseExercisesArguments = (req: Request): ExerciseArgumentsInterface => {
  const { target, daily_exercises } = req.body as {
    target: unknown;
    daily_exercises: unknown[];
  };

  if (!target || !daily_exercises) {
    throw new Error('parameters missing');
  }

  if (isNaN(Number(target)) || daily_exercises.filter(isNaN).length) {
    throw new Error('malformatted parameters');
  }

  return {
    target: Number(target),
    exerciseHour: daily_exercises.map(Number),
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
