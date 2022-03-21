import express, {Application, Request, Response} from 'express';
import {json} from 'body-parser';
import { routes } from './routes/routes';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import path from 'path';

const app: Application = express();
app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(json())

//routes
app.use('/api', routes);
app.use('', async(req: Request, res: Response) => {res.send('Insta Check API')})

//this folder is used to store files
app.use('/uploads', express.static(path.resolve('uploads')));

//connection
mongoose.connect('mongodb+srv://harRoot:insta2021@cluster0.tqyao.mongodb.net/instacheck', {
}, () => {console.log('Connected to database!')});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(''+
    '  ___           _           ____ _               _    \n'+
    ' |_ _|_ __  ___| |_ __ _   / ___| |__   ___  ___| | __\n'+
    '  | || \'_ \\/ __| __/ _` | | |   | \'_ \\ / _ \\/ __| |/ /\n'+
    '  | || | | \\__ | || (_| | | |___| | | |  __| (__|   < \n'+
    ' |___|_| |_|___/\\__\\__,_|  \\____|_| |_|\\___|\\___|_|\\_\\\n')
});