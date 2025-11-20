import './App.css';
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState({userID:"", userPassword:""});

  useEffect(()=>{
    console.log(userInfo);
  },[userInfo]);


  const onChange = (e)=>{
    const { name, value } = e.target;

    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const onSubmit = async ()=>{
    await axios.post(`http://localhost:5000/`,[userInfo]);
  }


  return (
    <>
      <div>
        <label>아이디:</label>
        <input onChange={onChange} name={`userID`} type={`text`}></input>
      </div>
      <div>
        <label>비밀번호:</label>
        <input onChange={onChange} name={`userPassword`} type={`password`}></input>
      </div>
      <button onClick={onSubmit} className='button-style2'>전송하기</button>
    </>
  );
}

export default App;