// 사용자의 상호작용에 의한 로직 정리
import db from "../config/db.js";


export const login = async (req, res)=>{
    const { id, password } = req.body;

    try{
        await db.query(
            `INSERT INTO users(user_id, user_password) VALUES(?,?)`,
            [id, password]
        );
         // 로그인 로직 구현...
        console.log(id, password);
        return res.status(200).json({massage:"사용자 데이터 저장", info:`저장된 데이터 id : ${id} password:${password}`});
    }catch(err){
        return res.status(500).json({err});
    }

}

