import express from 'express';
import controller from '../controllers/Event';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.event.create), controller.createEvent); //dins dels controller tenim els models, li passem HTTP
router.get('/:eventId', controller.readEvent);
router.get('/', controller.readAll);
router.get('/get/projection', controller.readAllA);
router.put('/:eventId', ValidateSchema(Schemas.event.update), controller.updateEvent);
router.delete('/:eventId', controller.deleteEvent);

export = router;
