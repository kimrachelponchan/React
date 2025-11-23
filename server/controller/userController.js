import db from '../config/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// 사용자의 상호작용에 의한 로직 정리
export const login = async (req, res) => {
  const { id, password } = req.body;

  // 나중에 회원가입 구현할 때 해야하는 로직
  // 비밀번호 해시를 게산 반복횟수(숫자가 높을수록 느려짐 즉, 해킹시도가 어려워짐)
  //   const saltRounds = 10;

  // // 비밀번호를 암호화하는 로직
  // // 해시가 되기도 전에 빈 값이 들어감 **await**
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
      console.log('존재하지 않는 사용자입니다');
      return res
        .status(200)
        .json({ msg: '존재하지 않는 사용자입니다.', id_check: false });
    } else {
      const isMatch = await bcrypt.compare(password, row[0].user_password);

      if (isMatch) {
        console.log('로그인 성공!');

        // 토큰 발급
        // const token = jwt.sign({ id: row[0].user_id }, process.env.JWT_SECRET, {
        //   expiresIn: process.env.JWT_EXPIRES_IN,
        // });

        const refresh_token = jwt.sign(
          { id: row[0].user_id },
          process.env.REFRESH_JWT_SECRET,
          {
            expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
          }
        );

        // 리프레쉬 토큰은 생명주기가 길어서 유출되면 도용 위험이 있기때문에
        // 서버의 쿠키에 저장하게 되면 유출 위험이 거의 0에 가깝다
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          // 개발환경 : false / 배포환경 : true
          secure: false,
          // CSRF 해킹 공격을 막아주는 옵션
          sameSite: 'strict',
          // 토큰 유효기간을 일치시켜주는 옵션
          maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const [token_result] = await db.query(
          `UPDATE users SET refresh_token = ? WHERE user_id = ?`,
          [refresh_token, row[0].user_id]
        )

        if(token_result.affectedRows === 0){
          console.log("DB 업데이트 실패: user_id 없음");
        }

        // 클라이언트에서 localStorage에 저장되어 요청마다 포함되는 토큰
         const access_token = jwt.sign(
          { id: row[0].user_id },
          process.env.ACCESS_JWT_SECRET,
          {
            expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
          }
        );

        return res
          .status(200)
          .json({ msg: '비밀번호가 일치합니다.', pw_check: true, access_token });
      } else {
        console.log('로그인 실패ㅜㅜ');
        return res
          .status(200)
          .json({ msg: '비밀번호가 일치하지않습니다.', pw_check: false });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ massage: '요청실패!' });
  }
};
