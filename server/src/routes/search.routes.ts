import { Router } from 'express';
import * as Controllers from '../controllers/search.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.route('/').get(asyncHandler(Controllers.search));

router
  .route('/userHistory')
  .post(asyncHandler(Controllers.setUserSearchHistory))
  .get(asyncHandler(Controllers.getUserSearchHistory));

export default router;
