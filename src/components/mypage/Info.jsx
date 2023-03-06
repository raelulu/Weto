import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './Info.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const Fdiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 90%;
  /* background-color: beige; */
  max-width: 1930px;
  height: 85%;
  @media (max-width: 912px) {
    height: 30%;
  }
`;
const Div = styled.div`
  position: absolute;
  width: 40%;
  height: 90%;
  right: 1%;
  top: 50%;
  transform: translate(0%, -50%);
  text-align: center;
  font-size: 1.5vw;
  /* background-color: #faf9f9; */
  @media (max-width: 912px) {
    position: relative;
    width: 80%;
    height: 70%;
    top: -20%;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align: center;
  }
  @media (max-width: 376px) {
    top: -50%;
  }
`;
const Ldiv = styled.div`
  position: absolute;
  width: 57%;
  height: 90%;
  left: 1%;
  top: 50%;
  transform: translate(0%, -50%);
  /* background-color: yellow; */
  @media (max-width: 912px) {
    width: 80%;
    top: 15vh;
    left: 50%;
    height: 20vh;
    transform: translate(-50%, 50%);
    text-align: center;
  }
  @media (max-width: 540px) {
    top: 40%;
  }
`;

const CrBox = styled.div`
  position: absolute;
  /* padding-left: 10%; */
  width: 100%;
  height: 30%;
  font-size: 2vw;
  /* background-color: red; */
  @media (max-width: 912px) {
    /* background-color: #FAF9F9; */
    height: 10vh;
    padding: unset;
  }
`;

const ChBox = styled.div`
  position: relative;
  /* padding-left: 10%;
  padding-top: 5%; */
  width: 100%;
  height: 30vm;
  top: 16vw;
  font-size: 2vw;
  /* background-color: #faf9f9; */
  @media (max-width: 912px) {
    padding-left: unset;
    /* background-color: #FAF9F9; */
    height: 30vw;
    top: 15vh;
  }
`;
// -------------------------------------------------------------
const ChallengeItems = styled.div`
  // 위치 지정
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 70%;

  // 폰트 지정
  @font-face {
    font-family: 'ONE-Mobile-Title';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Title.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'ONE-Mobile-Title';
  font-size: 1.7vw;
  @media (max-width: 1919px) {
    font-size: 1.3vw;
  }
  @media (max-width: 1441px) {
    font-size: 1.7vw;
    margin-bottom: 30px;
  }
  @media (max-width: 1200px) {
    font-size: 2vw;
  }
  @media (max-width: 912px) {
    font-size: 3vw;
    display: inline;
  }
  @media (max-width: 426px) {
    font-size: 2vw;
  }
  @media (max-width: 321px) {
    font-size: 1.7vw;
  }
`;
const ChallengeItem = styled.div`
  &:hover {
    color: #505050;
  }
`;

function BodyShorthandExample(crews) {
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
      <Fdiv>
        <Ldiv>
          <CrBox>
            <div>현재까지 기부 금액</div>
            <div>{amount}원</div>
          </CrBox>
          <ChBox>
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
            <React.Fragment>
              <ChallengeItems>
                <ChallengeItem></ChallengeItem>
              </ChallengeItems>
            </React.Fragment>
          </ChBox>
        </Ldiv>
        <Div>
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
            <Button
              variant="light"
              onClick={handleShow}
              className="edit_profile"
            >
              정보 수정
            </Button>
          </div>
        </Div>
      </Fdiv>

      <div>
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
      </div>
    </>
  );
}

export default BodyShorthandExample;
