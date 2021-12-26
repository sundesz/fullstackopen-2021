import { Router } from 'express';
import bmiController from '../controllers/bmi';

const bmiRouter = Router();

bmiRouter.get('/', bmiController.bmiCalculator);

export default bmiRouter;
