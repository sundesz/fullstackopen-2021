import { Router } from 'express';
import diagnosisController from '../controllers/diagnosis';

const diagnosisRouter = Router();

diagnosisRouter.get('/', diagnosisController.getAll);

export default diagnosisRouter;
