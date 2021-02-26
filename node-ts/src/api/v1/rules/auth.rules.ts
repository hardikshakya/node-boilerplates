import { check } from 'express-validator';
import { compare } from 'bcrypt';

import { User } from '../../../common/models';
import { verifyToken } from '../services/auth.service';

export const authRules = {
  forSignup: [
    check('name')
      .isLength({ min: 2 })
      .withMessage('name must be at least 2 chars long'),
    check('email')
      .isEmail()
      .withMessage('Invalid email format!')
      .custom(async (email) => {
        const user = await User.findOne({ where: { email } });
        if (user) {
          return Promise.reject(new Error('E-mail already in use!'));
        }
      }),
    check('password')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 chars long.')
      .matches(/\d/)
      .withMessage('password must contain a number!'),
  ],

  forLogin: [
    check('email')
      .isEmail()
      .withMessage('Invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return Promise.reject(new Error('E-mail already in use!'));
        }
      }),
    check('password').custom(async (password, { req }) => {
      const user = await User.findOne({ where: { email: req.body.email } });
      const isMatched = await compare(password, user!.password);
      if (!isMatched) {
        return Promise.reject(new Error('Invalid email or password!'));
      }
    }),
  ],

  forRefreshToken: [
    check('refreshToken').custom(async (refreshToken, { req }) => {
      const hasAccess = await verifyToken(req, refreshToken);
      if (!hasAccess) {
        return Promise.reject(new Error('Invalid token provided!'));
      }
    }),
  ],
};
