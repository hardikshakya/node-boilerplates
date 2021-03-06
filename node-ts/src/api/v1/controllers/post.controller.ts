import { Request, Response, NextFunction, Router } from 'express';
import { validationResult, matchedData } from 'express-validator';

import { HttpStatus } from '../../../common/constants';
import { logger, succeeded, failed } from '../../../common/helper';
import { tokenGuard } from '../middlewares/token-guard';
import { PostCreationAttributes } from '../../../common/models/Post';
import { postRules } from '../rules/post.rules';
import { createNewPost } from '../services/post.service';

const PostController: Router = Router();

/**
 * Create New Post
 */
PostController.post(
  '/',
  tokenGuard(),
  postRules.forPostCreate,
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
      }) as PostCreationAttributes;
      const post = await createNewPost({
        ...payload,
        postedBy: req.authUserData.id,
      });

      if (!post) {
        return failed(res, HttpStatus.FORBIDDEN, 'No access');
      }

      return succeeded(
        res,
        HttpStatus.CREATED,
        'Post Created Successfully.',
        post
      );
    } catch (error) {
      logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
      next(error);
    }
  }
);

export default PostController;
