import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { infochange, infoshow } from '../../store/modules/challenge';

const TitleBox = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.div`
  &:first-child {
    font-size: 35px;
  }
  &:last-child {
    color: #4b4a4a;
  }
  @media (max-width: 1024px) {
    &:first-child {
      font-size: 30px;
    }
    &:last-child {
      font-size: 12px;
    }
  }
  @media (max-width: 426px) {
    &:last-child {
      font-size: 10px;
    }
  }
`;

const ChallengeDiv = styled.div`
  // 위치 지정
  width: 100%;
  height: 100vh;
  margin-top: -150px;
  padding: 0 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1919px) {
    position: absolute;
  }
`;

const ChallengeItems = styled.div`
  // 위치 지정
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;

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
    font-size: 2vw;
  }
  @media (max-width: 1441px) {
    font-size: 2.5vw;
    margin-bottom: 30px;
  }
  @media (max-width: 1200px) {
    font-size: 3.5vw;
  }
  @media (max-width: 769px) {
    font-size: 5vw;
    margin-bottom: 25px;
  }
  @media (max-width: 426px) {
    font-size: 6vw;
  }
  @media (max-width: 321px) {
    font-size: 7vw;
  }
`;
const ChallengeItem = styled.div`
  &:hover {
    color: #505050;
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
const GoInfoIcon = styled(BsArrowRight)`
  animation: ${un_mount_icon} 0.3s ease-in-out;
`;

export default function ChallengeBox({ arrowShow }) {
  const dispatch = useDispatch();
  // challenge 게시글 정보 가져옴
  const challenge = useSelector((state) => state.challenge.challenge);
  // challenge 제목 hover 시, 화살표 이모지 나타남
  const [isHover, setIsHover] = useState(null);
  const infoShow = useSelector((state) => state.challenge.infoShow);

  const clickChallenge = (v) => {
    // challenge 제목 click 시, info 컴포넌트 화면에 보임 & challengeInfo 값 전달
    dispatch(infochange(v));
    dispatch(infoshow(true));
    setIsHover(null);
  };

  const MouseOver = (i) => {
    infoShow && arrowShow ? setIsHover(null) : setIsHover(i);
  };

  return (
    <ChallengeDiv>
      <TitleBox>
        <Title>challenge</Title>
        <Title>
          Challenge에 참여하고, 기부에 동참해주세요! (참여당 1000원이
          기부됩니다.)
        </Title>
      </TitleBox>
      {challenge.map((v, i) => (
        <React.Fragment key={i}>
          <ChallengeItems
            onMouseOver={() => MouseOver(i)}
            onMouseOut={() => setIsHover(null)}
            onClick={() => clickChallenge(v)}
          >
            <ChallengeItem>{v.name}</ChallengeItem>
            {isHover === i && <GoInfoIcon />}
          </ChallengeItems>
        </React.Fragment>
      ))}
    </ChallengeDiv>
  );
}
