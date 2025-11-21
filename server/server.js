import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = process.env.SERVER_PORT | 5000;


app.use(cors());    
app.use(express.json());


app.post('/login',(req, res)=>{
    const {id, password} = req.body;

    console.log(id);
    console.log(password);

    res.send("회원정보가 정상 처리 됌");
})

app.listen(PORT, () => {
    console.log(`서버 ${PORT}번 정상 작동`)
})
