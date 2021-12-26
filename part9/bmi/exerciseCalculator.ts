interface ExerciseArgumentsInterface {
  target: number;
  exerciseHour: number[];
}

interface CalculateExercisesInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RatingDescriptionInterface {
  rating: number;
  ratingDescription: string;
}

const processArgumentsForExercise = (
  args: string[]
): ExerciseArgumentsInterface => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyExercisesHour = args.splice(3, args.length);

  if (
    isNaN(Number(args[2])) ||
    dailyExercisesHour.filter((hour) => isNaN(Number(hour))).length
  ) {
    throw new Error('Provided arguments should be a numbers!');
  }

  return {
    target: Number(args[2]),
    exerciseHour: dailyExercisesHour.map((hour) => Number(hour)),
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
      return { rating: 1, ratingDescription: 'bad' };
  }
};

const calculateExercises = (
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
