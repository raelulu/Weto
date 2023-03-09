import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import NavBar from './NavBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Info.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const Hello = styled.h1`
  font-family: 'GongGothicMedium';
  color: white;
  @media (max-width: 912px) {
    font-size: 5vw;
  }
`;
const Div = styled.div`
  position: fixed;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  background: linear-gradient(120deg, #5800ff, #ffc600);
`;

const Maindiv = styled.div`
  position: absolute;
  right: 5%;
  margin: 150px 5%;
  color: white;
  width: 50%;
  max-width: 1980px;
  height: max-content;
  overflow: hidden;
  @media (max-width: 912px) {
  }
  @media (max-width: 540px) {
  }
  @media (max-width: 426px) {
  }
`;

const CrBox = styled.div`
  /* position: absolute; */
  padding: 5%;
  background-color: rgb(255, 198, 0, 0.2);
  width: 100%;
  border-radius: 20px;
  @media (max-width: 912px) {
  }
  @media (max-width: 426px) {
  }
`;

const WetherDiv = styled.div`
  position: fixed;
  width: 25%;
  height: 70vh;
  margin-top: 150px;
  border-radius: 20px;
  padding: 5%;
  left: 10%;
  background-color: rgb(255, 198, 0, 0.2);
  color: white;
  @media (max-width: 912px) {
  }
  @media (max-width: 426px) {
  }
`;
const ChBox = styled.div`
  /* position: absolute; */
  padding: 5%;
  background-color: rgb(255, 198, 0, 0.2);
  width: 100%;
  border-radius: 20px;
  margin: 5% 0;
  font-size: 5vh;
  text-align: center;
  @media (max-width: 912px) {
  }
  font-size: 3.5vh;
  @media (max-width: 426px) {
  }
`;
// -------------------------------------------------------------
const ChallengeItems = styled.div`
  // 위치 지정
  margin: 1%;
  padding: 1%;
  display: inline-block;
  width: 21%;
  height: 10vh;
  color: black;
  background-color: white;

  // 폰트 지정
  @font-face {
    font-family: 'ONE-Mobile-Title';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Title.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'ONE-Mobile-Title';
  font-size: 1.6vh;
  @media (max-width: 1919px) {
    font-size: 1.3vh;
  }
  @media (max-width: 1024px) {
    font-size: 1.3vh;
  }
  @media (max-width: 912px) {
    font-size: 2.5vh;
    width: 40%;
  }
  @media (max-width: 426px) {
    font-size: 5vw;
  }
  @media (max-width: 321px) {
    font-size: 1.7vw;
  }
`;
const ChallengeItem = styled.div`
  &:hover {
    color: gray;
  }
`;

const un_mount_icon = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const GoInfoIcon = styled.div`
  position: absolute;
  top: 63vh;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1vw;
  font-family: initial;
  font-weight: 900;
  color: #ffc600;
  animation: ${un_mount_icon} 0.5s ease-in-out;
  @media (max-width: 769px) {
    font-size: 1px;
  }
`;

export default function Main({ arrowShow }) {
  const navigate = useNavigate();
  // const myCrew = useSelector(state => state.myCrew)
  // const myCrew = [{ id: 1, title: '같이 운동해요', max: 2 }, {}, {}];

  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [id, setId] = useState('');
  const [crew, setCrew] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //추가해야 하는 부분
  const user = useSelector((state) => state.user.userInfo);
  const [amount, setAmount] = useState(0);

  const nickNameHandler = (e) => {
    setNickname(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const idHandler = (e) => {
    setId(e.target.value);
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    // 프론트 <-> 서버 연결 에러 수정
    const infomodal = async () => {
      console.log(sessionStorage.id);
      const userinfo = await axios({
        method: 'post',
        url: '/mypage/info',
        data: {
          id: sessionStorage.id,
        },
      });
      // info: 유저 정보, amount: 기부금 총 합
      setResult(userinfo.data.info);
      setAmount(userinfo.data.amount);
      setCrew(userinfo.data.crew);
      console.log(userinfo.data);
    };

    // 비로그인 시, alert 창 띄운 후 -> login페이지로
    if (sessionStorage.id === undefined) {
      alert('로그인을 하세요.');
      navigate('/login');
    } else {
      infomodal();
    }
  }, []);

  const deleteInfo = async () => {
    const delData = await axios({
      method: 'delete',
      url: '/auth/delInfo',
      data: {
        id: sessionStorage.id,
        pw: sessionStorage.pw,
        address: city,
        name: name,
        nickName: nickname,
      },
    });
    sessionStorage.clear();
    alert('탈퇴완료');
    navigate('/');
  };

  const updateInfo = async () => {
    const data = await axios({
      method: 'put',
      url: '/auth/updateInfo',
      data: {
        id: sessionStorage.id,
        city: city,
        name: name,
        nickName: nickname,
      },
    });
    alert('회원정보 수정');
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Div>
        <NavBar />
      </Div>
      <WetherDiv>
        <div className="my_info_container">
          {/* <div className="myInfo">나의 정보</div> */}
          <Space direction="vertical" size={16} className="avatar">
            <Space wrap size={16}>
              <Avatar size={64} icon={<UserOutlined />} />
            </Space>
          </Space>
          <div> {result.name}</div>
          <div> {result.nickName}</div>
          <div> {result.id}</div>
          <div> {result.city}</div>
          <Button variant="light" onClick={handleShow} className="edit_profile">
            정보 수정
          </Button>
        </div>
      </WetherDiv>
      <Maindiv>
        {/* <Div1> */}
        <CrBox>
          CREW
          <br />
          <br />
          {crew.map((el, i) => (
            <div className="crew_info" key={i}>
              <img alt="img" src={el.image} className="crew_img" />
              <div className="crew_word">
                <div>{el.title}</div>
                <div>{el.info}</div>
              </div>
            </div>
          ))}
        </CrBox>
        {/* </Div1> */}
        <ChBox>
          <div>현재까지 기부 금액</div>
          <div>{amount}원</div>
        </ChBox>
      </Maindiv>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <label>아이디</label>
          <br />
          <input
            type="text"
            className="id"
            value={result.id}
            onChange={idHandler}
          />
          <br />
          <label>닉네임</label>
          <br />
          <input
            type="text"
            className="nickname"
            value={nickname}
            onChange={nickNameHandler}
          />
          <br />
          <label>이름</label>
          <br />
          <input
            type="text"
            className="name"
            value={name}
            onChange={nameHandler}
          />
          <br />
          <label>도시</label>
          <br />
          <input
            type="text"
            className="city"
            value={city}
            onChange={cityHandler}
          />
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="light" onClick={updateInfo}>
            수정하기
          </Button>
          <Button variant="light" onClick={() => deleteInfo()}>
            탈퇴하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
