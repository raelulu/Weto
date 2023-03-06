import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import {
  goupload,
  infoshow,
  modal,
  reRender,
} from '../../store/modules/challenge';
import Upload from './Upload';
import { BiLeftArrowAlt, BiX } from 'react-icons/bi';

const InfoBox_mount = keyframes`
    from {
        opacity: 0;
        right: 5%;
    }
    to {
        opacity: 1;
        right: 0%;
    }
`;
const InfoBox_unmount = keyframes`
    from {
        opacity: 1;
        right: 0%;
    }
    to {
        opacity: 0;
        right: 5%;
    }
`;

const InfoBox = styled.div`
  animation: ${(props) =>
    props.animation
      ? css`
          ${InfoBox_mount} 1s ease-in-out
        `
      : css`
          ${InfoBox_unmount} 1s ease-in-out
        `};

  width: 100%;
  margin-right: 5%;
  height: 75vh;
  background-color: #fafafa;
  border: 1px solid #d8d8d8;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1920px) {
    top: 15%;
    right: 0%;
    width: 45%;
    position: absolute;
  }

  @media (max-width: 1700px) {
    width: 50% !important;
  }
  @media (max-width: 1025px) {
    width: 90% !important;
  }
`;

const ExitIcon = styled(BiLeftArrowAlt)`
  float: right;
  color: #797979 !important;
  margin-top: 7px;
`;

const Title = styled.div`
  padding: 20px 30px 5px 30px;
  border-bottom: 1px solid #999999;

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
  background: linear-gradient(to right bottom, #000000, #d7d7d7);
  color: transparent;
  -webkit-background-clip: text;

  @media (max-width: 1920px) {
    font-size: 2vw;
  }
  @media (max-width: 1700px) {
    font-size: 2.7vw;
  }
  @media (max-width: 1025px) {
    font-size: 3.7vw;
  }
`;

const Main = styled.div`
  padding: 10px 30px 0 30px;
  overflow: auto;
  height: inherit;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #e0e0e0;
  }
  &::-webkit-scrollbar-thumb {
    background: #5d5d5d;
    border-radius: 5px;
  }
`;
const Donation = styled.div`
  margin-bottom: 10px;
`;
const ProofImg = styled.img`
  object-fit: cover;
  border: 1px solid #999999;
  width: 100%;
  height: 250px;
  margin-bottom: 30px;
`;

const Footer = styled.div`
  padding: 15px 40px 15px 15px;
  border-top: 1px solid #999999;
`;
const JoinBtn = styled(Button)`
  float: right;
`;
const ProofBtn = styled(Button)`
  float: right;
  clear: both;
  margin: 0 0 3px 7px;
`;
const FooterExplanation = styled.div`
  margin-bottom: 15px;
  @media (max-width: 1200px) {
    text-align: center;
    margin: 0 30px 15px 30px;
    font-size: 12px;
  }
`;

export default function Info({ imgWidth }) {
  const dispatch = useDispatch();
  const [mountAni, setMountAni] = useState(true);
  // challenge 정보 가져옴
  const infoObj = useSelector((state) => state.challenge.infoObj);
  // 인증글 정보 가져옴
  const [proofData, setProofData] = useState([]);
  // 요건 미충족 시, 버튼 disabled
  const [joinBtnDisabled, setJoinBtnDisabled] = useState(true);
  const [proofBtnDisabled, setProofDisabled] = useState(true);
  // 인증 게시글 작성 페이지로 이동
  const goUpload = useSelector((state) => state.challenge.goUpload);
  // 참여하기 완료 후, info창 리렌더
  const rerender = useSelector((state) => state.challenge.rerender);

  useEffect(() => {
    // portOne 실행을 위한 설정
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const portOne = document.createElement('script');
    portOne.src = 'https://service.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(portOne);

    //user_id가 있으면 '참여하기'버튼 active
    if (
      sessionStorage.id !== undefined &&
      sessionStorage.id !== process.env.REACT_APP_ADMIN_ID
    )
      setJoinBtnDisabled(false);
  }, []);

  const axiosData = async () => {
    await axios
      .post('/challenge/searchData', {
        challenge_name: infoObj.name,
        user_id: sessionStorage.id,
      })
      .then((res) => {
        setProofData(res.data.ProofData);
        // 사용자 기부 횟수 0 or 기부 횟수 = 인증 횟수인 경우, '인증남기기' 버튼 disabled
        // 아닐 경우, '인증남기기' 버튼 active
        res.data.myChallengeLength === 0
          ? setProofDisabled(true)
          : res.data.myChallengeLength === res.data.myProofLength
          ? setProofDisabled(true)
          : setProofDisabled(false);
      });
  };

  // 인증 게시물 가져옴
  useEffect(() => {
    axiosData();
    dispatch(goupload(false));
    dispatch(reRender(false));
  }, [infoObj, rerender]);

  // 인증 게시물 올린 뒤 리렌더링 -> 올린 게시글 새로고침 없이 확인하기 위해
  useEffect(() => {
    axiosData();
  }, [goUpload]);

  // '인증남기기' 버튼 클릭 시, 사진 업로드 컴포넌트로 전환
  const GoUpload = () => dispatch(goupload(true));

  // '참여하기' 버큰 클릭 시, 결제 진행
  const JoinClick = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init(`${process.env.REACT_APP_IMP}`);
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: new Date().getTime(),
        name: infoObj.name,
        amount: infoObj.price,
        buyer_email: '',
        buyer_name: `${sessionStorage.id}`,
        buyer_tel: `${sessionStorage.phone}` || '01012341212',
      },
      function (rsp) {
        if (rsp.success) {
          // 기부 결제 완료 시, user 정보 서버로 전송
          console.log(rsp);
          const data = {
            user_id: rsp.buyer_name,
            user_phone: rsp.buyer_tel.replace(/-/g, ''),
            challenge_name: rsp.name,
            amount: rsp.paid_amount,
          };
          axios
            .post('/challenge/putData', data)
            .then(() => dispatch(modal(true)));
        } else {
          console.log(rsp);
        }
      }
    );
  };

  // 인증샷 삭제
  const deleteImg = (v) => {
    axios
      .delete('/challenge/deleteData', {
        data: { img: v.img, challenge_name: v.challenge_name },
      })
      .then((res) => {
        alert('삭제완료');
        setProofData(res.data);
      });
  };

  // unmount 효과
  const CloseInfo = () => setMountAni(false);
  useEffect(() => {
    if (!mountAni) {
      setTimeout(() => dispatch(infoshow(false)), 900);
    }
  }, [mountAni]);

  return (
    <InfoBox animation={mountAni}>
      <Title>
        {infoObj.name} <ExitIcon onClick={CloseInfo} />
      </Title>
      <Main>
        {goUpload ? (
          <Upload />
        ) : (
          <>
            <Donation>
              {proofData.length === 0
                ? '누적 기부금: 0원'
                : `누적 기부금: ${proofData.length}000원`}
            </Donation>
            <Row>
              {proofData.slice(0, 6).map((v, i) => (
                <React.Fragment key={i}>
                  <Col xs={imgWidth}>
                    {sessionStorage.id === process.env.REACT_APP_ADMIN_ID ? (
                      <BiX size="20" onClick={() => deleteImg(v)} />
                    ) : (
                      true
                    )}
                    <ProofImg src={v.img} />
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </>
        )}
      </Main>
      <Footer>
        <FooterExplanation>
          {infoObj.content.split(/\n/).map((v, i) => (
            <div key={i}>{v}</div>
          ))}
        </FooterExplanation>
        <ProofBtn variant="dark" disabled={proofBtnDisabled} onClick={GoUpload}>
          인증남기기
        </ProofBtn>
        <JoinBtn variant="dark" onClick={JoinClick} disabled={joinBtnDisabled}>
          참여하기
        </JoinBtn>
      </Footer>
    </InfoBox>
  );
}
