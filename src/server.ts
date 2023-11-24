/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log('Database connected successfully');
    app.listen(config, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
