import db from "../config/db.js";

// 사용자의 상호작용에 의한 로직 정리
export const login = async (req, res)=>{
    const { id, password } = req.body;
    try{
        const [row] = await db.query(`INSERT INTO users(user_id, user_password) VALUES(?,?)`,[id, password]);
        return res.status(200).json({msg:"요청성공!", res: row});
    }catch(err){
        console.log(err);
        return res.status(500).json({massage:"요청실패!"});
    }
}
