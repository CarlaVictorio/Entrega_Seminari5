import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.book.create), controller.createBook); //dins dels controller tenim els models, li passem HTTP
router.get('/:bookId', controller.readBook);
router.get('/', controller.readAll);
router.get('/get/projection', controller.readAllA);
router.get('/:bookId/author', controller.readAllB);
router.put('/:bookId', ValidateSchema(Schemas.book.update), controller.updateBook);
router.delete('/:bookId', controller.deleteBook);

export = router;
