import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/Users/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

//user application
app.use("/api",UserRoutes)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({message:"server home page"});
};

app.get('/', getAController);

export default app;
