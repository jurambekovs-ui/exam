import express from 'express';
import { config } from 'dotenv';

config();

import connectDB from './config/db.js';
import movieRoutes from './routes/movies.route.js';

const app = express();
const PORT = Number(process.env.PORT);


app.use(express.json());

await connectDB();

app.use('/api/movies', movieRoutes);


app.listen(PORT,()=>
console.log(`Server is running on port`, PORT));