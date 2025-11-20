import express from "express";
import dotenv from "dotenv";
import cors from "cors";


// 중요한 파일 설정을 가져오기위해 NodeJS에서 env파일을 읽을 수 있도록 설정하는 코드
// 이를 위해 해야할 것은 package에 npm install dotenv를 설치해야함
dotenv.config({path: "./config/.env"});

const app = express();
const PORT = process.env.SERVER_PORT | 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.post('/', (req, res)=>{
    console.log("클라이언트에서 요청됌!");
    const userInfo = req.body;

    console.log(userInfo);
    res.send("요청성공!");
})

app.get('/', (req,res)=>{
    res.send("요청성공!");
})

app.listen(PORT,()=>{
    console.log(`server SuccessFully PORT:${PORT}`);
})