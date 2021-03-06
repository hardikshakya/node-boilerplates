import { check } from 'express-validator';

export const postRules = {
  forPostCreate: [
    check('title')
      .isLength({ min: 2 })
      .withMessage('post title must be at least 2 chars long!'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('post description is required!'),
  ],
};
