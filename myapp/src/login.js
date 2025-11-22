import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [userInfo, setUseinfo] = useState({
    id: "",
    password: "",
  });

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  // 함수 선언식
  function handleInput(e) {
    const { name, value } = e.target;
    setUseinfo((prev) => ({ ...prev, [name]: value }));
    console.log(value);
  }

  // 함수 표현식(변수에 할당)
  const handleSubmit = async () => {
    const result = await axios.post(
      `http://localhost:5000/api/login`,
      userInfo
    );

    // 예외처리
    console.log(result.data);
    if (result.data.id_check === false) {
      alert(result.data.msg);
    } else if (result.data.pw_check === false) {
      alert(result.data.msg);
    } else {
      // 예외 처리를 통과하면 홈으로 이동
      navigate("/home");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[40%] flex flex-col p-5 rounded-2xl gap-6">
        <h1 className="text-center bg-white">Login</h1>
        <div className="flex bg-yellow-100">
          <label className="mr-4">아이디</label>
          <input
            name={`id`}
            onChange={handleInput}
            type="text"
            placeholder="아이디 입력"
            className="border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex bg-gray-100">
          <label className="mr-4">비밀번호</label>
          <input
            name={`password`}
            onChange={handleInput}
            type="password"
            placeholder="비밀번호 입력"
            className="border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-300 rounded-xl px-5 py-1 font-bold"
          type="submit"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
