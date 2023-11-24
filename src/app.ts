import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/Users/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());



//user application
app.use("/api",UserRoutes)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({message:"server home page"});
};

app.get('/', getAController);

export default app;
