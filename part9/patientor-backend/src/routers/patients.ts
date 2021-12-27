import { Router } from 'express';
import patientController from '../controllers/patients';

const patientRouter = Router();

patientRouter.get('/', patientController.getAll);

export default patientRouter;
