import express from 'express';
import exerciseCalculator from '../controllers/exercises';

const exerciseRouter = express.Router();

exerciseRouter.get('/', exerciseCalculator.exerciseCalculator);

export default exerciseRouter;
