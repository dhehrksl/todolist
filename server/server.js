const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(cors());
app.use(express.json());

const databaseuser = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "mydb",
});

databaseuser.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err);
    throw err;
  }
  console.log('데이터베이스 연결 성공');
});

app.listen(3300, () => {
  console.log("서버 실행 중");
});

// 사용자 추가 엔드포인트
app.post("/user", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('비밀번호 해싱 실패:', err);
      res.status(500).send("추가 실패");
      return;
    }
    const query = `INSERT INTO user (email, password) VALUES (?, ?)`;
    databaseuser.query(query, [email, hashedPassword], (err) => {
      if (err) {
        console.error('사용자 추가 실패:', err);
        res.status(500).send("추가 실패");
        return;
      }
      console.log('사용자 추가 성공');
      res.status(200).send("추가 성공");
    });
  });
});

// 로그인
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM user WHERE email = ?`;
  databaseuser.query(query, [email], (err, results) => {
    if (err) {
      console.error('로그인 실패:', err);
      res.status(500).send("로그인 실패");
      return;
    }
    if (results.length > 0) {
      const hashedPassword = results[0].password;
      bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptRes) => {
        if (bcryptErr) {
          console.error('비밀번호 비교 실패:', bcryptErr);
          res.status(500).send("로그인 실패");
          return;
        }
        if (bcryptRes) {
          console.log('로그인 성공');
          res.status(200).send("로그인 성공");
        } else {
          console.error('비밀번호가 일치하지 않습니다.');
          res.status(401).send("이메일 또는 비밀번호가 잘못되었습니다.");
        }
      });
    } else {
      console.error('사용자가 존재하지 않습니다.');
      res.status(401).send("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  });
});

// 이메일 중복 확인
app.get('/user/checkEmail', (req, res) => {
  const { email } = req.query;
  const query = `SELECT COUNT(*) AS sameEmail FROM user WHERE email = ?`;
  databaseuser.query(query, [email], (err, results) => {
    if (err) {
      console.error('중복 이메일 확인 오류:', err);
      return res.status(500).send("중복 이메일 확인 오류 발생");
    }
    const sameEmail = results[0].sameEmail;
    console.log('중복 이메일 개수:', sameEmail);
    res.status(200).json({ exists: sameEmail > 0 });
  });
});

// 할 일 목록 가져오기
app.get('/todoList', (req, res) => {
  const { email } = req.query;
  const query = `SELECT * FROM todolist WHERE email = ? ORDER BY date ASC`;
  databaseuser.query(query, [email], (err, results) => {
    if (err) {
      console.error('할 일 목록 가져오기 실패:', err);
      return res.status(500).send("할 일 목록을 불러오는 중 오류가 발생했습니다.");
    }
    console.log('할 일 목록 가져오기 성공');
    res.status(200).json(results);
  });
});

// 할 일 추가
app.post("/todoList", (req, res) => {
  const { email, task, date, ischecked, additionalsmalltasks } = req.body;
  const query = `INSERT INTO todolist (email, task, date, ischecked, additionalsmalltasks) VALUES (?, ?, ?, ?, ?)`;
  console.log(query);

  databaseuser.query(query, [email, task, date, ischecked, additionalsmalltasks], async (err, result) => {
    if (err) {
      console.error('할 일 추가 실패:', err);
      return res.status(500).send("할 일 추가 실패");
    }
    console.log('할 일 추가 성공');
    res.status(200).send("할 일 추가 성공");
  });
});

app.post("/deleteList", (req, res) => {
  const id = req.body.id;
  const checkQuery = `SELECT * FROM todolist WHERE id = ?`;
  
  databaseuser.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error('ID 확인 실패:', err);
      return res.status(500).send("ID 확인 실패");
    }

    if (results.length === 0) {
      return res.status(404).send("아이디가 없습니다.");
    }

    const deleteQuery = `DELETE FROM todolist WHERE id = ?`;
    databaseuser.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.error('할 일 삭제 실패:', err);
        return res.status(500).send("할 일 삭제 실패");
      }

      if (results.affectedRows === 0) {
        return res.status(404).send("할 일이 없습니다.");
      }

      console.log('할 일 삭제 성공');
      res.status(200).send("할 일 삭제 성공");
    });
  });
});


// 할 일 수정 엔드포인트
app.post("/updateTaskList", (req, res) => {
  const { id, task, ischecked,date, additionalsmalltasks } = req.body;

  const query = `UPDATE todolist SET task = ?, ischecked = ?, date = ?, additionalsmalltasks = ? WHERE id = ?`;

  databaseuser.query(query, [task, ischecked, date, additionalsmalltasks, id], (err) => {
      if (err) {
          console.error('할 일 수정 실패:', err);
          return res.status(500).send("할 일 수정 실패");
      }

      console.log('할 일 및 추가 작은 일정 업데이트 성공');
      res.status(200).send("할 일 및 추가 작은 일정 업데이트 성공");
  });
});

app.post("/outToggleTaskCheck", (req, res) => {
  const { id, ischecked} = req.body;
  const query = `UPDATE todolist SET isChecked = ? WHERE id = ?`;
  databaseuser.query(query, [ischecked, id], (err) => {
      if (err) {
          console.error('완료 수정 실패:', err);
          return res.status(500).send("할 일 수정 실패");
      }

      console.log('완료 수정 성공');
      res.status(200).send("완료 수정 성공");
  });
});

app.post("/selectDateAndSearchComplete", (req, res) => {
  const { date, email, done, keyword } = req.body;
  console.log(date);
  const q_date = () => {
    if (date) {
      if (date.length > 7) {
        return `AND date = '${date}'`;
      } else {
        return `AND date LIKE '%${date}%'`;
      }
    } else {
      return '';
    }
  };
  const q_email = () => {
    if (email) {
      return `AND email = '${email}'`;
    } else {
      return '';
    }
  };
  const q_isdone = () => {
    if (done === '1') {
      return 'AND isChecked = 0';
    } else if (done === '0') {
      return 'AND isChecked = 1';
    } else {
      return '';
    }
  };
  const q_title = () => {
    if (keyword) {
      return `AND (task LIKE '%${keyword}%' OR additionalsmalltasks LIKE '%${keyword}%')`;
    } else {
      return '';
    }
  };

  const query = `SELECT * FROM todolist WHERE 1=1 ${q_date()} ${q_email()} ${q_isdone()} ${q_title()} ORDER BY date ASC`;

  databaseuser.query(query, (err, results) => {
    if (err) {
      console.error('검색 실패:', err);
      return res.status(500).send("검색 실패");
    }
    console.log('검색 성공');
    res.status(200).json(results);
  });
});
