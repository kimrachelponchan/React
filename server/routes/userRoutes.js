// 카카오 API요청 > 카카오 서버 token발급 > 다시 카카오 서버에 token들고 사용자 정보에 접근 > 우리서버에서 해석된 정보를 받아와
// > 데이터베이스에 회원정보 저장 > home으로 이동 

import express from 'express';
import {login} from '../controller/userController.js';



const Router = express.Router();

Router.post('/login',login);

export default Router;

// 1. 로그인 페이지만들기 /회원가입(생략가능) - 메인페이지로 이동 토큰을 발급해서 매 로그인마다 토큰 유효기간을 둬서
// 장시간 이용없을 경우 로그아웃

// 2. 메인페이지 무한스크롤 구현

// 3. 커뮤니티 페이지 만들어서 websocket을 이용한 채팅구현

// * 혹시 가능하면 파일업로드나 파일다운로드 로직 연습까지