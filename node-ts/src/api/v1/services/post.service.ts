import {
  User,
  PostCreationAttributes,
  PostAttributes,
} from '../../../common/models';

/**
 * Create New Post
 * @param param0 Post request data and Logged-In user's ID
 * @returns PostAttributes | null
 */
export const createNewPost = async ({
  title,
  description,
  postedBy,
}: PostCreationAttributes): Promise<PostAttributes | null> => {
  const user = await User.findByPk(postedBy);

  if (!user) {
    return null;
  }

  const post = await user.createPost({ title, description });
  return post;
};
