import {
  CalculateExercisesInterface,
  ExerciseArgumentsInterface,
  RatingDescriptionInterface,
} from './interface/exercises';

const processArgumentsForExercise = (
  args: string[]
): ExerciseArgumentsInterface => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [, , target, ...dailyExercisesHour] = args;

  if (
    isNaN(Number(target)) ||
    dailyExercisesHour.filter((hour) => isNaN(Number(hour))).length
  ) {
    throw new Error('Provided arguments should be a numbers!');
  }

  return {
    target: Number(target),
    exerciseHour: dailyExercisesHour.map(Number),
  };
};

const getRatingAndDescription = (hours: number): RatingDescriptionInterface => {
  switch (true) {
    case hours >= 1:
      return { rating: 3, ratingDescription: 'good' };
    case hours < 1 && hours >= 0.5:
      return {
        rating: 2,
        ratingDescription: 'not too bad but could be better',
      };
    case hours < 0.5:
    default:
      return { rating: 1, ratingDescription: 'bad' };
  }
};

export const calculateExercises = (
  target: number,
  exerciseHour: number[]
): CalculateExercisesInterface => {
  const periodLength = exerciseHour.length;
  const expectedHour = periodLength * target;
  const actualHour = exerciseHour.reduce((sum, value) => sum + value, 0);
  const { rating, ratingDescription } = getRatingAndDescription(
    actualHour / expectedHour
  );

  return {
    periodLength,
    trainingDays: exerciseHour.filter((e) => e).length,
    success: actualHour >= expectedHour,
    rating,
    ratingDescription,
    target,
    average: actualHour / periodLength,
  };
};

try {
  const { target, exerciseHour } = processArgumentsForExercise(process.argv);
  console.log(calculateExercises(target, exerciseHour));
} catch (e: unknown) {
  let errMessage = 'Something bad happened';
  if (e instanceof Error) {
    errMessage += ` "${e.message}"`;
  }
  console.log(errMessage);
}
