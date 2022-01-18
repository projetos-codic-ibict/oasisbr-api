import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

export const MongooseTestModule = (options: MongooseModuleOptions = config) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongoServer = await MongoMemoryServer.create({
        instance: { dbName: 'oasisbr_test' },
      });
      const mongoUri = await mongoServer.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeMongoTestConnection = async () => {
  if (mongoServer) await mongoServer.stop();
};
