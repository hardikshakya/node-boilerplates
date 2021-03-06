import { Model, DataTypes, Optional } from 'sequelize';

import { sequelize } from '../config/database';
import { logger } from '../helper';

// Attributes of Post Model
export interface PostAttributes {
  id: number;
  title: string;
  description: string;
  postedBy: number;
  createdAt: Date;
  updatedAt: Date;
}

// Some attributes are optional in `Post.build` and `Post.create` calls
export interface PostCreationAttributes
  extends Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public postedBy!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'posts',
    sequelize,
    underscored: true,
    timestamps: true,
  }
);

Post.sync().then(() => logger.info('Post table synced.'));
