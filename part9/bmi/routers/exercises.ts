import express from 'express';
import exerciseCalculator from '../controllers/exercises';

const exerciseRouter = express.Router();

exerciseRouter.post('/', exerciseCalculator.exerciseCalculator);

export default exerciseRouter;
