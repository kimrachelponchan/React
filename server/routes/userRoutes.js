// 카카오 API요청 > 카카오 서버 token발급 > 다시 카카오 서버에 token들고 사용자 정보에 접근 > 우리서버에서 해석된 정보를 받아와
// > 데이터베이스에 회원정보 저장 > home으로 이동 

import express from 'express';
import {login} from '../controller/userController.js';



const Router = express.Router();

Router.post('/login',login);

export default Router;