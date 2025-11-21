import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.SERVER_PORT | 5000;


app.use(cors());    
app.use(express.json());


app.use('/api',userRoutes);

//api/login

app.listen(PORT, () => {
    console.log(`서버 ${PORT}번 정상 작동`)
})
