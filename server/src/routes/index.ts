import { Router } from 'express';
import searchRouters from './search.routes';

const router = Router();

router.use('/search', searchRouters);

export default router;
