import { Request, Response, NextFunction, Router } from 'express';
import { validationResult, matchedData } from 'express-validator';

import { authRules } from '../rules/auth.rules';
import { addUser } from '../services/user.service';
import {
  login,
  signAccessToken,
  signRefreshToken,
  reIssueTokens,
} from '../services/auth.service';
import { UserAddModel } from '../../../common/models';
import { HttpStatus } from '../../../common/constants';
import { logger, succeeded, failed } from '../../../common/helper';

const AuthController: Router = Router();

/**
 * Sign-up New User
 */
AuthController.post(
  '/signup',
  authRules.forSignup,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return failed(
          res,
          HttpStatus.UNPROCESSABLE_ENTITY,
          errors.array()[0].msg
        );
      }

      const payload = matchedData(req, {
        includeOptionals: false,
      }) as UserAddModel;
      const user = await addUser(payload);
      const accessToken = await signAccessToken({
        id: user!.id,
        email: user!.email,
      });
      const refreshToken = await signRefreshToken({
        id: user!.id,
        email: user!.email,
      });

      return succeeded(res, HttpStatus.CREATED, 'SignUp Completed.', {
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
      next(error);
    }
  }
);

/**
 * Login
 */
AuthController.post(
  '/login',
  authRules.forLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return failed(
          res,
          HttpStatus.UNPROCESSABLE_ENTITY,
          errors.array()[0].msg
        );
      }

      const payload = matchedData(req, {
        includeOptionals: false,
      }) as UserAddModel;
      const data = await login(payload);

      return succeeded(res, HttpStatus.OK, 'Logged-In Successfully.', data);
    } catch (error) {
      logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
      next(error);
    }
  }
);

/**
 * Reissue The Tokens When The Access Token Expires
 */
AuthController.post(
  '/refresh-token',
  authRules.forRefreshToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return failed(
          res,
          HttpStatus.UNPROCESSABLE_ENTITY,
          errors.array()[0].msg
        );
      }

      const data = await reIssueTokens(req);

      return succeeded(res, HttpStatus.OK, 'Reissued tokens.', data);
    } catch (error) {
      logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
      next(error);
    }
  }
);

export default AuthController;
