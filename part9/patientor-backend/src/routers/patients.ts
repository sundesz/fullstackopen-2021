import { Router } from 'express';
import patientController from '../controllers/patients';

const patientRouter = Router();

patientRouter.get('/', patientController.getAll);
patientRouter.post('/', patientController.create);

export default patientRouter;
