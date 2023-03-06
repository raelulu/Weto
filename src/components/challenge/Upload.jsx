import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { goupload } from '../../store/modules/challenge';
import styled from 'styled-components';
import { BiImage } from 'react-icons/bi';
import { Button } from 'react-bootstrap';

const Title = styled.div`
  font-weight: bolder;
  font-size: 1.1vw;

  @media (max-width: 1400px) {
    font-size: 1.3vw;
  }
  @media (max-width: 1024px) {
    font-size: 1.7vw;
  }
  @media (max-width: 1023px) {
    font-size: 2.2vw;
  }
  @media (max-width: 767px) {
    font-size: 2.5vw;
  }
`;
const UploadBtn = styled(Button)`
  float: right;
  margin: 10px 0;
`;
const Labelcss = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgIcon = styled(BiImage)`
  width: 50%;
  height: 50%;
`;

const UploadImg = styled.img`
  width: inherit;
  height: inherit;
`;

export default function Upload() {
  const dispatch = useDispatch();
  const infoObj = useSelector((state) => state.challenge.infoObj);
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true);

  useEffect(() => {
    if (!img) setUploadBtnDisabled(true);
    else setUploadBtnDisabled(false);
  }, [img]);

  const ImgUploading = (e) => {
    //1-2) 업로드 할 이미지파일 정보 imgUrl로 저장
    setImgUrl(e.target.files[0]);

    //1-3) 화면에 업로드 할 이미지 미리볼 수 있도록 설정
    // FileReader 생성자를 사용하여 이미지 미리보기 기능 구현
    const reader = new FileReader();
    // readAsDataURL: 바이너리 파일을 Base64 Encode 문자열로 반환
    reader.readAsDataURL(e.target.files[0]);
    // 읽기 동작이 성공적으로 완료되었을 때 발생
    reader.onload = () => {
      setImg(reader.result);
      uploadBtnDisabled(false);
    };
  };

  const sendData = async () => {
    const formData = new FormData();
    formData.append('challenge_name', infoObj.name);
    formData.append('user_id', sessionStorage.id);
    formData.append('img', imgUrl);
    await axios
      .post('/challenge/upLoadData', formData)
      .then(() => dispatch(goupload(false)));
  };

  return (
    <>
      <Title>인증샷 업로드</Title>
      <Labelcss htmlFor="file">
        {!img ? <ImgIcon /> : <UploadImg src={img} />}
      </Labelcss>
      <input
        type="file"
        accept="image/*"
        id="file"
        style={{ display: 'none' }}
        onChange={ImgUploading}
      />
      <UploadBtn onClick={sendData} disabled={uploadBtnDisabled}>
        업로드
      </UploadBtn>
    </>
  );
}
