import path from 'path';

import dotenv from 'dotenv';
import envSchema from 'env-schema';
import S from 'fluent-json-schema';

// Load environment based on profile
// ex., .<NODE_ENV>.env
export default function loadEnv(): void {
  const envData = dotenv.config({
    path: path.join(
      __dirname,
      `../../../.${
        process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
      }.env`
    ),
  });

  if (envData.error) {
    throw new Error(envData.error.toString());
  }

  envSchema({
    data: envData.parsed,
    schema: S.object()
      .prop(
        'NODE_ENV',
        S.string().enum(['development', 'testing', 'production']).required()
      )
      .prop('PORT', S.string().required()),
  });
}
