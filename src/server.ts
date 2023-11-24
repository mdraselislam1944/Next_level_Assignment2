import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(`mongodb+srv://EcommerceSite:xfcyMbY6VWNB6ET5@cluster11.cpm08j1.mongodb.net/test`);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
