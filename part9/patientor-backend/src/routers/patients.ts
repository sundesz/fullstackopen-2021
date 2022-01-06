import { Router } from 'express';
import patientController from '../controllers/patients';

const patientRouter = Router();

patientRouter.get('/:id', patientController.getOne);
patientRouter.get('/:id/entries', patientController.getEntries);
patientRouter.post('/:id/entries', patientController.createEntry);
patientRouter.get('/', patientController.getAll);
patientRouter.post('/', patientController.create);

export default patientRouter;
