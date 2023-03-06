import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userJoin } from '../store/modules/register';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -150px;
  width: 300px;
  height: 400px;
  background-color: #faf9f9;
  border: 0.5px solid black;
  text-align: center;
`;
const Logo = styled.p`
  width: 137px;
  height: 65px;
  margin: 20px auto 0px;
  font-family: 'Port Lligat Slab';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 64px;
  cursor: pointer;
`;
const ID = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Name = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Phone = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Nickname = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const PW = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const City = styled.select`
  width: 69%;
  height: 6%;
  padding-left: 7px;
  border: 1px solid #d8d8d8;
  color: #999999;
  font-size: 10px;
  ::placeholder {
    font-size: 3px;
  }
`;
const Joinbtn = styled.button`
  width: 69%;
  height: 8%;
  margin: 20px;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;
`;
export default function JoinBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const registerId = (e) => {
    setId(e.target.value);
  };
  const registerPwd = (e) => {
    setPwd(e.target.value);
  };
  const registerCity = (e) => {
    setCity(e.target.value);
  };
  const registerName = (e) => {
    setName(e.target.value);
  };
  const registerNickname = (e) => {
    setNickname(e.target.value);
  };
  const registerPhone = (e) => {
    setPhone(e.target.value);
  };
  
  const register = async () => {
    if(phone.length !== 11){
      alert('11자리가 맞는지 확인해주세요.');
    }else if(phone.slice(0,3) !== '010'){
      alert('옳바른 형식이 아닙니다. ex.01012341234');
    } else
    try {
      const request = await axios({
        method: 'post',
        url: '/auth/signup',
        data: {
          id: id,
          pw: pwd,
          city: city,
          name: name,
          nickName: nickname,
          phone: phone
        },
      });
      dispatch(userJoin(request.data));
      alert('회원가입 성공');
      navigate('/login');
    } catch (err) {
      if (err.response.data === '존재하는 ID입니다.') {
        alert('존재하는 ID입니다');
        setId('');
      } else if (err.response.data === '존재하는 닉네임입니다.') {
        alert('존재하는 닉네임입니다.');
        setNickname('');
      }
    }
  };

  return (
    <>
      <Div>
        <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
        <ID placeholder="ID" value={id} onChange={registerId} required />
        <br />
        <PW
          placeholder="Password"
          value={pwd}
          type={'password'}
          onChange={registerPwd}
          required
        />
        <div>user info</div>
        <Name placeholder="Name" value={name} onChange={registerName}></Name>
        <br />
        <Nickname
          placeholder="Nickname"
          value={nickname}
          onChange={registerNickname}
        ></Nickname>
        <Phone placeholder="Phone ex.01012341234" value={phone} onChange={registerPhone} type='number' required></Phone>
        <br />
        <div>----------side info----------</div>
        <City name="items1" onChange={registerCity} required>
          <option value="">City</option>
          <option value="seoul/서울특별시">서울특별시</option>
          <option value="Daejeon/세종특별시">세종특별시</option>
          <option value="Incheon/인천광역시">인천광역시</option>
          <option value="Gwangju/광주광역시">광주광역시</option>
          <option value="Ulsan/울산광역시">울산광역시</option>
          <option value="Daejeon/대전광역시">대전광역시</option>
          <option value="Daegu/대구광역시">대구광역시</option>
          <option value="Busan/부산광역시">부산광역시</option>
          <option value="Gyeonggi-do/경기도">경기도</option>
          <option value="Gangwon-do/강원도">강원도</option>
          <option value="Chungcheongbuk-do/충청북도">충청북도</option>
          <option value="Chungcheongnam-do/충청남도">충청남도</option>
          <option value="Gyeongsangbuk-do/경상북도">경상북도</option>
          <option value="Gyeongsangnam-do/경상남도">경상남도</option>
          <option value="Jeollabuk-do/전라북도">전라북도</option>
          <option value="Jeollanam-do/전라남도">전라남도</option>
          <option value="Jeju-do/제주도">제주도</option>
        </City>
        <Joinbtn onClick={() => register()}>Create an Account</Joinbtn>
      </Div>
    </>
  );
}
