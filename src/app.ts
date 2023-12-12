import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { UserRoutes } from './app/modules/Users/user.route';
import bodyParser from 'body-parser';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


//user application
app.use("/api",UserRoutes)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({message:"server home page"});
};

app.get('/', getAController);

app.use((req:Request, res:Response, next:NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


export default app;
