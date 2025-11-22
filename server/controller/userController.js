import db from "../config/db.js";
import bcrypt from "bcrypt";

// 사용자의 상호작용에 의한 로직 정리
export const login = async (req, res) => {
  const { id, password } = req.body;

  // 나중에 회원가입 구현할 때 해야하는 로직
  // 비밀번호 해시를 게산 반복횟수(숫자가 높을수록 느려짐 즉, 해킹시도가 어려워짐)
  //   const saltRounds = 10;

  // 비밀번호를 암호화하는 로직
  // 해시가 되기도 전에 빈 값이 들어감 **await**
  //   const secretPassword = await bcrypt.hash(password, saltRounds);

  // 로그인 구현
  // 아이디 검증 부분은 생력
  // 비밀번호만 비교하고 로그인 처리 구햔

  try {
    // 현재 아이디를 입력한 사용자가 데이터베이스에 존재하는지 확인
    // 사용자가 있으면 예) row = [{user_id: "abc", user_password: "hashedPW"}]
    const [row] = await db.query(
      `SELECT user_id, user_password FROM users WHERE user_id = ?`,
      [id]
    );

    // const [row] = await db.query(
    //   `INSERT INTO users(user_id, user_password) VALUES(?,?)`,
    //   [id, secretPassword]
    // );

    // 해당 아이디가 존재하지 않으면 예외처리
    if (row.length === 0) {
      console.log("존재하지 않는 사용자입니다");
      return res
        .status(200)
        .json({ msg: "존재하지 않는 사용자입니다.", id_check: false });
    } else {
      const isMatch = await bcrypt.compare(password, row[0].user_password);

      if (isMatch) {
        console.log("로그인 성공!");
        return res
          .status(200)
          .json({ msg: "비밀번호가 일치합니다.", pw_check: true });
      } else {
        console.log("로그인 실패ㅜㅜ");
        return res
          .status(200)
          .json({ msg: "비밀번호가 일치하지않습니다.", pw_check: false });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ massage: "요청실패!" });
  }
};
