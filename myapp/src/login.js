import { useState } from "react";
import axios from 'axios';


export const Login = () => {

    const [userInfo, setUseinfo] = useState({
        id : '',
        password : ''
    })

    function handleInput(e){
        const {name, value} = e.target;
        console.log(value);
        setUseinfo((prev) => ({...prev, [name] : value }));
        console.log(userInfo)

    }


    async function handleSubmit (){
        await axios.post('http://localhost:5000/login', userInfo);
    }


    return(
        <div className="w-[100vw] h-[100vh] bg-gray-100">
            <div className="flex justify-center">Login</div>
            <div className="flex"><p className="mr-4">아이디</p><input name={`id`} onChange={handleInput} type="text" placeholder="아이디 입력"/></div>
            <div className="flex"><p className="mr-4">비밀번호</p><input name={`password`} onChange={handleInput} type="password" placeholder="비밀번호 입력"/></div>
            <button onClick={handleSubmit}  className="bg-blue-300 rounded-xl px-5 py-1 font-bold" type="submit">전송</button>
        </div>
    )

}