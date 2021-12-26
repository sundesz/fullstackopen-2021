import express from 'express';
import bmiController from '../controllers/bmi';

const bmiRouter = express.Router();

bmiRouter.get('/', bmiController.bmiCalculator);

export default bmiRouter;
