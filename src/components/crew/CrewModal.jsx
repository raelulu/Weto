import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { crewChange, modalShow } from '../../store/modules/crew';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const CrewTitle = styled.input`
  width: 65%;
  height: 3%;
  padding: 10px;
  margin: 5px 30px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const ImgInput = styled.input`
  width: 65%;
  height: 3%;
  padding: 10px;
  margin: 3px 93px;
  border: 1px solid #d8d8d8;
`;
const CrewInfo = styled.input`
  width: 65%;
  height: 3%;
  padding: 10px;
  margin: 5px 15px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;

const Person = styled.select`
  width: 65%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  margin: 5px 20px;
`;
const CityInfo = styled.input`
  width: 65%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  margin: 5px 50px;
`;

export default function CrewModal() {
  const show = useSelector((state) => state.crew.modalShow);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalShow(false));

  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [crewInfo, setCrewInfo] = useState('');
  const registerImg = (e) => {
    setImg(e.target.files[0]);
  };
  const option = [2, 3, 4, 5, 6];
  const [cityInfo, setCityInfo] = useState('');
  const [max, setMax] = useState(2);
  const user = sessionStorage;

  const registerTitle = (e) => {
    setTitle(e.target.value);
  };
  const registerCrewInfo = (e) => {
    setCrewInfo(e.target.value);
  };
  const changeCityInfo = (e) => {
    setCityInfo(e.target.value);
  };
  const selectOnChange = (e) => setMax(e.target.value);

  const addCrew = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('info', crewInfo);
    formData.append('max', max);
    formData.append('nickName', user.nickName);
    formData.append('city', user.city?.split('/')[1] + ' ' + cityInfo);
    formData.append('img', img);
    axios.post('/crew/putCrew', formData).then((res) => {
      console.log('확인용ㅇㅇㅇㅇ', res);
      // dispatch(crewMain(res.data));
      dispatch(modalShow(false));
      dispatch(crewChange(true));
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>크루 개설하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        이미지:
        <ImgInput
          type="file"
          accept="image/jpg, image/jepg, imag/png"
          //value={img}
          onChange={registerImg}
        />
        <br />
        크루 명 :
        <CrewTitle
          placeholder="Crew명"
          value={title}
          onChange={registerTitle}
          required
        />
        <br />
        소개 문구 :
        <CrewInfo
          placeholder="Crew 소개 문구"
          value={crewInfo}
          onChange={registerCrewInfo}
          required
        />
        <br />
        최대 인원:
        <Person onChange={selectOnChange}>
          {option.map((v, i) => (
            <option key={i}>{v}</option>
          ))}
        </Person>
        <br />
        시/구:
        <CityInfo
          placeholder="시 또는 구를 적어주세요!"
          value={cityInfo}
          onChange={changeCityInfo}
          required
        />
      </Modal.Body>

      <Modal.Footer className="modal_footer">
        <Button variant="light" onClick={() => addCrew()}>
          크루 개설하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
