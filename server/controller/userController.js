
export const login = (req, res)=>{
    const { id, password } = req.body;
    // 로그인 로직 구현...
    console.log(id, password);
    res.send("요청이 처리됌!");
}


