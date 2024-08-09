import { Router } from 'express';
import verifyToken from '../middleware.js';
import {
    listarTodosLibros,
    listarLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} from '../../controllers/libros/librosController.js';

const librosRouter = Router();

librosRouter.use(verifyToken);

librosRouter.get('/', listarTodosLibros);
librosRouter.get('/:id', listarLibroPorId);

librosRouter.post('/', crearLibro);
librosRouter.put('/:id', actualizarLibro);
librosRouter.delete('/:id', eliminarLibro);

export default librosRouter;
