import React, { useEffect, useRef, useState } from 'react';
import CrewBox from '../components/crew/CrewBox.jsx';
import NavBar from '../components/mypage/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  crewShow,
  infoShow,
  crewMain,
  crewChange,
} from '../store/modules/crew';
import axios from 'axios';

const Div = styled.div`
  position: absolute;
  width: 33%;
  right: 7%;
  top: 150px;
  text-align: center;
`;

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
export default function Crew() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const crew = useSelector((state) => state.crew.crewInfo);
  console.log(crew);
  // let [input, setInput] = useState('');
  // function addCrew(input) {
  //   let newCrew = [...crew];
  //   newCrew.unshift(input);
  //   setInput(newCrew);
  // }
  const dispatch = useDispatch();
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [crewInfo, setCrewInfo] = useState('');
  const registerImg = (e) => {
    setImg(e.target.files[0]);
  };
  const user = useSelector((state) => state.user.userInfo);
  const option = [2, 3, 4, 5, 6];
  const [cityInfo, setCityInfo] = useState('');
  const [max, setMax] = useState(2);

  const change = useSelector((state) => state.crew.crewChange);

  console.log('user', user);
  const addCrew = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('info', crewInfo);
    formData.append('max', max);
    formData.append('nickName', user.nickName);
    formData.append('city', user.address + ' ' + cityInfo);
    formData.append('img', img);
    axios.post('/crew/putCrew', formData).then((res) => {
      console.log(res);
      // dispatch(crewMain(res.data));
      setShow(false);
      dispatch(crewChange(true));
    });
  };

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

  useEffect(() => {
    const address = user.address === undefined ? '서울' : user.address;
    const axiosData = async () => {
      await axios
        .get('/crew/showCrew', {
          params: { city: address },
        })
        .then((res) => dispatch(crewShow(res.data)));
    };
    axiosData();
    dispatch(infoShow(false));
    dispatch(crewChange(false));
  }, [change]);

  return (
    <div>
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
      <NavBar />
      <Div>
        <Button variant="light" onClick={handleShow}>
          +CREW
        </Button>
      </Div>
      {/* <DivCrewBox> */}
      <CrewBox />
      {/* </DivCrewBox> */}

      {/* <DivChatBox>
        <ChatBox />
      </DivChatBox> */}
    </div>
  );
}
