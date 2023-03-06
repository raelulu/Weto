import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { userInfoCreate } from '../store/modules/user';
import { useNavigate } from 'react-router-dom';
// import { change } from '../store/modules/user';

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
  margin: 70px auto -10px;

  font-family: 'Port Lligat Slab';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 64px;
  cursor: pointer;
`;
const ID = styled.input`
  width: 70%;
  height: 8%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const PW = styled.input`
  width: 70%;
  height: 8%;
  padding: 10px;
  margin: 8px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const ErrorMSG = styled.div`
  width: 62%;
  margin: auto;
  color: red;
  font-size: 10%;
  text-align: left;
  font-family: 'Port Lligat Slab';
`;
const Line = styled.span`
  color: #d8d8d8;
`;
const LoginBtn = styled.button`
  width: 70%;
  height: 8%;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;

  &:disabled {
    /* background-color: unset;
    color: black;
    cursor: initial; */
  }
`;
const JoinBtn = styled.button`
  width: 70%;
  height: 8%;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;
`;

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [valid, setValid] = useState(true);
  const [btnAct, setBtnAct] = useState(true);
  const navigate = useNavigate();
  // const [savedLoginId, setSavedLoginId] = useState('');
  // const [savedLoginPassword, setSavedLoginPassword] = useState('');
  // const [savedLoginNickname, setSavedLoginNickname] = useState('');
  // const [savedLoginAddress, setSavedLoginAddress] = useState('');

  const sessionStorage = window.sessionStorage;

  // user_name을 변경하는 작업
  // 1.임시 user_name 설정
  const user_name = '서새싹';
  const dispatch = useDispatch();
  // 2.useSelecter: user.jsx에 있는 initState 값을 가져오는 메서드
  const name = useSelector((state) => state.user.user_name);
  // 3.dispatch: user.jsx에 설정한 액션함수를 가져오는 메서드
  // const changeName = () => dispatch(change(user_name));
  // 4.콘솔 확인(user_name)
  console.log('name: ', name);

  const idValue = (e) => {
    setId(e.target.value);
    if (id !== '') {
      setBtnAct(true);
    } else setBtnAct(false);
  };
  const pwValue = (e) => {
    setPw(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  const login = async () => {
    // setSavedLoginId(sessionStorage.getItem('id'));
    // setSavedLoginPassword(sessionStorage.getItem('pw'));
    if (pw == '') {
      setValid('비밀번호를 입력해주세요.');
    } else
      try {
        const data = await axios({
          method: 'post',
          url: '/auth/login',
          data: {
            id,
            pw,
          },
        });
        if (data.data.message == '로그인 성공!') {
          // dispatch(userInfoCreate(data.data.data));
          console.log('양식', data.data.data);
          sessionStorage.setItem('id', data.data.data.id);
          sessionStorage.setItem('name', data.data.data.name);
          sessionStorage.setItem('nickName', data.data.data.nickName);
          sessionStorage.setItem('city', data.data.data.city);
          sessionStorage.setItem('phone', data.data.data.phone);
          alert('로그인 성공');
          navigate('/');
        }
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data == '유저 정보가 없습니다.') {
          setValid('일치하는 아이디가 없습니다.');
          setId('');
          setPw('');
        } else if (err.response.data == '비밀번호가 일치 하지 않습니다.') {
          setValid('비밀번호를 확인해주세요.');
        }
      }
  };

  return (
    <>
      <Div>
        <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
        <ID placeholder="ID" value={id} onChange={idValue} required />
        <br />
        <PW
          placeholder="Password"
          value={pw}
          onKeyPress={handleOnKeyPress}
          onChange={pwValue}
          type={'password'}
          required
        />
        <br />
        <ErrorMSG>{valid}</ErrorMSG>
        <br />
        <LoginBtn
          // disabled={btnAct}
          onClick={() => login()}
        >
          Log In
        </LoginBtn>
        <br />
        <Line>--------------------------------------</Line>
        <br />
        <JoinBtn onClick={() => window.open('/Join', '_self')}>
          Create an Account
        </JoinBtn>
        {/* 삭제하세욤 */}
        <br />
        {/* <button onClick={changeName}>fkfkf</button> */}
      </Div>
    </>
  );
}
