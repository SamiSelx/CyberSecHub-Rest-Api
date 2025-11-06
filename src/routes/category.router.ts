import { Router } from 'express'
import { LoadAllCategories, AddCategory } from '../controller/category.controller'

const categoryRouter = Router();

categoryRouter.get('/get-all', LoadAllCategories);
categoryRouter.put('/add-cat', AddCategory);

export default categoryRouter;