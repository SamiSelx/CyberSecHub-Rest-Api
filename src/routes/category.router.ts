import { Router } from 'express'
import { LoadAllCategories, AddCategory, deleteCategory } from '../controller/category.controller'
import { checkLogs, isAdmin, isLoggedIn } from '../middleware/auth';

const categoryRouter = Router();

categoryRouter.get('/all', LoadAllCategories);
categoryRouter.delete('/delete/:id',checkLogs,isLoggedIn, isAdmin, deleteCategory)
categoryRouter.post('/create',checkLogs,isLoggedIn, isAdmin, AddCategory);

export default categoryRouter;