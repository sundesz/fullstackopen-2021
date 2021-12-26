export interface ExerciseArgumentsInterface {
  target: number;
  exerciseHour: number[];
}

export interface CalculateExercisesInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface RatingDescriptionInterface {
  rating: number;
  ratingDescription: string;
}
