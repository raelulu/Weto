const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3000', 'http://3.35.48.121:3000'],
    methods: ['GET', 'POST'],
  },
});
let users = {};
let room = {};
let crew = {};
io.on('connection', (socket) => {
  // 채팅방 입장

  socket.on('notice', (data) => {
    console.log('notice1', data);
    users[socket.id] = data.nickName;
    if(!crew[data.currentCrew.id]){
      crew[data.currentCrew.id] = 1
    } else {
      console.log('121111')
      crew[data.currentCrew.id] += 1;
    }
    io.to(data.currentCrew.id).emit('notice', {
      type: 'notice',
      chat: data.nickName + '님이 입장하였습니다.',
    });
    io.emit('numberInChat', {
      numberInChat: crew
    });
  });

  socket.on('join', (data) => {
    console.log(data.currentCrew);
    room[socket.id] = data.currentCrew;
    socket.join(data.currentCrew);
  });

  socket.on('joinCrew', (data) => {
    console.log('joinCrew', data);

    io.emit('joinCrew', data);
  });
  socket.on('outCrew', (data) => {
    console.log('outCrew', data);
    io.emit('outCrew', data);
  });
  socket.on('removeCrew', (data) => {
    console.log('removeCrew', data);
    io.emit('removeCrew', data);
  });

  console.log('server open ' + socket.id);
  socket.emit('socketID', socket.id);
  socket.on('sendMsg', (data) => {
    data['from'] = socket.id;
    data['User_nickName'] = data.nickName;
    data['isDm'] = false;
    io.to(data.currentCrew.id).emit('newMsg', data);
  });
  // 채팅방 퇴장
  socket.on('roomOut', (data) => {
    console.log('roomOut', data);
    // console.log(room[socket.id]);
    socket.leave(data.currentCrewId);
    crew[data.currentCrewId] -= 1;
    io.to(data.currentCrewId).emit('notice', {
      type: 'notice',
      chat: data.nickName + '님이 대화창을 나갔습니다.',
      
    });
    io.emit('numberInChat', {
      numberInChat: crew
    });

  });
  socket.on('disconnect', () => {
    console.log('disconnect');

    crew[room[socket.id]] ? crew[room[socket.id]] -= 1 : null;
    io.to(room[socket.id]).emit('notice', {
      type: 'notice',
      chat: users[socket.id] + '님이 대화창을 나갔습니다.',
      
    });
    io.emit('numberInChat', {
      numberInChat : crew
    });
    // delete users[socket.id];
    // io.emit('users', users);
  });
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결됨.');
  })
  .catch((err) => {
    console.error(err);
  });
app.use(morgan('dev')); // 로그
// app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://3.35.48.121:3000'],
    credentials: true,
    method: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
);

const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const mateRouter = require('./routes/mate');
const crewRouter = require('./routes/crew');
const challengeRouter = require('./routes/challenge');
const weatherRouter = require('./routes/weather');
const mypageRouter = require('./routes/mypage');

app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/mate', mateRouter);
app.use('/crew', crewRouter);
app.use('/challenge', challengeRouter);
app.use('/weather', weatherRouter);
app.use('/mypage', mypageRouter);
// 서버 실행
// app.listen(app.get("port"), () => {
//   console.log(app.get("port"), "번 포트에서 대기 중");
// });
http.listen(process.env.PORT, () =>
  console.log(`${process.env.PORT} server running`)
);
