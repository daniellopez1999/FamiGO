import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './dbConfig';
import app from './app';
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`FamiGO app listening on port ${port}.`);
    });
  } catch (error) {}
})();
