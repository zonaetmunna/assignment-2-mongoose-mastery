import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // eslint-disable-next-line no-console
    console.log('Database connected successfully');
    app.listen(config, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

main();
