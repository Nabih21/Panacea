//import 'react-native-gesture-handler'; DONT FORGET
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//"start": "nodemon src/index.js",
import { servPass } from "./env_variables.js";
import { userRouter } from './routes/users.js';


const app = express();
app.use(express.json());
app.use(cors());




app.use('/auth', userRouter);

mongoose.connect(
    `mongodb+srv://pancea2024:${servPass}@pancea.qmoce6f.mongodb.net/Pancea?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    }
);

app.listen(3001, () => console.log("Server Started"));
