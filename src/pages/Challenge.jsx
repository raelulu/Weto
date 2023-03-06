import React, { useEffect } from 'react';
import NavBar from '../components/mypage/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  goupload,
  infochange,
  infoshow,
  modal,
  reRender,
} from '../store/modules/challenge';
import Info from '../components/challenge/Info';
import ChallengeBox from '../components/challenge/ChallengeBox';
import ModalCH from '../components/challenge/ModalCH';
import { Pc, Tablet, Mobile } from '../components/common/Responsive';
import styled from 'styled-components';

const OutBox = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export default function Challenge() {
  const dispatch = useDispatch();
  // challenge 참여 완료 시, modal창 나타남
  const modalShow = useSelector((state) => state.challenge.modal);
  // challenge 제목 click 시, info창 나타남
  const infoShow = useSelector((state) => state.challenge.infoShow);

  useEffect(() => {
    // challenge 페이지 렌더링 시, state 초기값으로 재설정
    dispatch(infochange({}));
    dispatch(infoshow(false));
    dispatch(modal(false));
    dispatch(goupload(false));
    dispatch(reRender(false));
  }, []);

  return (
    <>
      <NavBar />
      {modalShow && <ModalCH />}
      <OutBox>
        <Pc>
          <ChallengeBox arrowShow={true} />
          {infoShow && <Info imgWidth={6} />}
        </Pc>

        <Tablet>
          <ChallengeBox arrowShow={true} />
          {infoShow && <Info imgWidth={6} />}
        </Tablet>

        <Mobile>
          <ChallengeBox arrowShow={false} />
          {infoShow && <Info imgWidth={12} />}
        </Mobile>
      </OutBox>
    </>
  );
}
