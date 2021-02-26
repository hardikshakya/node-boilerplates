import { hash } from 'bcrypt';

import { User, UserAddModel, UserAttributes } from '../../../common/models';
import { userAttributes } from '../../../common/constants';

const saltRounds = parseInt(`${process.env?.SALT_ROUNDS}`, 10);

/**
 * Get User Info By Id
 * @param id User Id
 */
export const getUserById = async (id: number): Promise<UserAttributes> => {
  const user: UserAttributes | null = await User.findByPk(id, {
    attributes: userAttributes,
    raw: true,
  });

  if (!user) {
    throw new Error('No user found.');
  }

  return user;
};

/**
 * Add New User
 * @param param0 Request Data Payload
 */
export const addUser = async ({
  name,
  email,
  password,
}: UserAddModel): Promise<UserAttributes> => {
  const hashPassword = await hash(password, saltRounds);
  const user: UserAttributes = await User.create({
    name,
    email,
    password: hashPassword,
  });

  return getUserById(user.id);
};
