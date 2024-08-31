import express, { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import connect from './db/connect.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connect();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));

app.use('/', userRoutes);

app.listen(port, ()=>console.log(`Server started on http://localhost:${port}`));