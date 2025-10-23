import { MongooseModule } from '@nestjs/mongoose';

export const MongoConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: process.env.MONGO_URI, // será definida en docker-compose.yml
    dbName: process.env.MONGO_DB_NAME || 'notifications_db',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
});

