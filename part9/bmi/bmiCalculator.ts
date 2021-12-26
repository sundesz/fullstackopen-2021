interface BmiInterface {
  height: number;
  weight: number;
}

const processArgumentsForBMI = (args: string[]): BmiInterface => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided arguments should be a numbers!');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi >= 16 && bmi <= 16.9:
      return 'Underweight (Moderate thinness)	';
    case bmi >= 17 && bmi <= 18.4:
      return 'Underweight (Mild thinness)	';
    case bmi >= 18.5 && bmi <= 24.9:
      return 'Normal (healthy weight)';
    case bmi >= 25 && bmi <= 29.9:
      return 'Overweight';
    case bmi >= 30 && bmi <= 34.9:
      return 'Obese (Class I)	';
    case bmi >= 35 && bmi <= 39.9:
      return 'Obese (Class II)';
    case bmi >= 40:
      return 'Obese (Class III)';
  }
};

try {
  const { height, weight } = processArgumentsForBMI(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let errMessage = 'Something bad happened';
  if (e instanceof Error) {
    errMessage += ` "${e.message}"`;
  }
  console.log(errMessage);
}
