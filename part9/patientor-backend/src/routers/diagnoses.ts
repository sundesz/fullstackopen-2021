import { Router } from 'express';
import diagnosisController from '../controllers/diagnoses';

const diagnosisRouter = Router();

diagnosisRouter.get('/', diagnosisController.getAll);

export default diagnosisRouter;
