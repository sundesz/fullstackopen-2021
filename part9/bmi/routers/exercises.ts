import { Router } from 'express';
import exerciseCalculator from '../controllers/exercises';

const exerciseRouter = Router();

exerciseRouter.post('/', exerciseCalculator.exerciseCalculator);

export default exerciseRouter;
