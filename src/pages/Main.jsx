import React, { useState } from 'react';
import Weather from '../components/main/Weather.jsx';
import styled, { keyframes } from 'styled-components';
import NavBar from '../components/mypage/NavBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MainCrew from '../components/main/MainCrew.jsx';

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
  // width: 20%;
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
  const [isHover, setIsHover] = useState(null);
  const MouseOver = (i) => {
    infoShow && arrowShow ? setIsHover(null) : setIsHover(i);
  };

  const info = useSelector((state) => state.user.userInfo);

  const infoShow = useSelector((state) => state.challenge.infoShow);
  const challenge = useSelector((state) => state.challenge.challenge);
  return (
    <>
      <Div>
        <NavBar />
      </Div>
      <WetherDiv>
        <Weather />
      </WetherDiv>
      <Maindiv>
        {/* <Div1> */}
        <CrBox>
          {info.id == undefined ? (
            <Hello>안녕하세요. WetoUser님.</Hello>
          ) : (
            <Hello>안녕하세요. {info.nickName}님.</Hello>
          )}
          <p style={{ color: 'white' }}>
            Weto에 오신 것을 환영합니다.
            <br />
            CREW에서 활동을 시작해보아요.
          </p>
          <Link
            as={Link}
            to="/crew"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MainCrew />
          </Link>
        </CrBox>
        {/* </Div1> */}
        <ChBox>
          OPEN Challenge
          <br />
          <br />
          {challenge.map((v, i) => (
            <React.Fragment key={i}>
              <Link
                as={Link}
                to="/challenge"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {isHover === i && (
                  <GoInfoIcon>
                    Challenge 참여할 시, 1,000원 기부됩니다.
                  </GoInfoIcon>
                )}
                <ChallengeItems
                  onMouseOver={() => MouseOver(i)}
                  onMouseOut={() => setIsHover(null)}
                >
                  <ChallengeItem>{v.name}</ChallengeItem>
                </ChallengeItems>
              </Link>
            </React.Fragment>
          ))}
        </ChBox>
      </Maindiv>
    </>
  );
}
