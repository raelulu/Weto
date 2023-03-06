import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/mypage/NavBar';
import { Pagination } from 'antd';
import { crewChange, crewPagination, modalShow } from '../store/modules/crew';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import CrewModal from '../components/crew/CrewModal';

const InfoTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

export default function ChatPage() {
  let socket = io.connect(process.env.REACT_APP_URL);

  const user = sessionStorage;
  const [crew, setCrew] = useState([]);

  const [display, setDisplay] = useState(0);
  const [currentCrew, currentCrewSet] = useState('');
  const page = useSelector((state) => state.crew.page);
  const crewPagi = crew.slice(page * 6, page * 6 + 6);
  const dispatch = useDispatch();
  const changeNum = (e) => dispatch(crewPagination(e - 1));
  const change = useSelector((state) => state.crew.crewChange);
  const [numberInChat, numberInChatSet] = useState(0);

  useEffect(() => {
    dispatch(crewPagination(0));
    dispatch(modalShow(false));
    dispatch(crewChange(false));
  }, [change]);

  async function AllmatePostLoad() {
    const city =
      user.city === undefined ? '서울특별시' : user.city?.split('/')[1];
    const data = await axios({
      method: 'get',
      url: `/crew/showCrew`,
      params: {
        city: city,
      },
    });
    setCrew(data.data);
  }

  async function joinCrew() {
    if (!sessionStorage.id) {
      return alert('로그인 후 이용해주세요.');
    }
    if (currentCrew.users?.find((e) => e.nickName == user.nickName)) {
      //데미더이터
      //내 유저 아이디와 같은게 있다면
      //입장
      setDisplay(2);
      alert('입장');
    } else if (currentCrew.max <= currentCrew.users?.length) {
      alert('인원이 초과되었습니다.');
    } else {
      const data = await axios({
        method: 'post',
        url: '/mate/addcrew',
        data: {
          // User_id: user.id, //더미데이터
          crewId: currentCrew.id,
        },
      });
      alert('가입을 축하드립니다.');
      socket?.emit('joinCrew', { nickName: user.nickName, currentCrew });

      setDisplay(2);
    }
  }

  async function outCrew() {
    alert('정말로 탈퇴하시겠습니까?');

    const data = await axios({
      method: 'delete',
      url: '/mate/outcrew',
      data: {
        // User_id: user.id, //더미데이터
        crewId: currentCrew.id,
      },
    });
    socket?.emit('outCrew', { nickName: user.nickName, currentCrew });
    setDisplay(1);
    // setDisplay((state) => !state);
  }

  function selectCrew(e) {
    currentCrewSet(e);
    setDisplay(1);
    if (display == 2) {
      socket?.emit('roomOut', {
        currentCrewId: currentCrew.id,
        nickName: user.nickName,
      });
      numberInChatSet((state) => {
        state[currentCrew.id] -= 1;
        return state;
      });
    }
  }

  useEffect(() => {
    AllmatePostLoad();

    socket?.on('joinCrew', (data) => {
      //인원 제한시 실시간으로 반영하기 위해 사용

      setCrew((state) => {
        return state.map((e) => {
          if (e.id == data.currentCrew.id) {
            e.users = [...e.users, { nickName: data.nickName }];
          }
          return e;
        });
      });
      if (data.currentCrew.id == currentCrew.id) {
        currentCrewSet((state) => {
          state.users = [...state.users, { nickName: data.nickName }];
          return state;
        });
      }
      // currentCrewSet((state) => {
      //   if (state.id == data.currentCrew.id) {
      //     state.users = [...state.users, { nickName: data.nickName }];
      //   }
      //   return state;
      // });
      // const currentCrew = crew.filter(e => e.id == currentCrew.id)
      // currentCrew.users = [...currentCrew.users, {nickName: data.nickName}]
      // setCrew((state => ({...state, currentCrew})))
    });
    socket?.on('removeCrew', (data) => {
      //인원 제한시 실시간으로 반영하기 위해 사용

      setCrew((state) => {
        return state.filter((e) => e.id != data.crewId);
      });
    });
    socket?.on('numberInChat', (data) => {
      numberInChatSet((state) => data.numberInChat);

      //인원 제한시 실시간으로 반영하기 위해 사용
    });

    socket?.on('removeCrew', (data) => {
      //인원 제한시 실시간으로 반영하기 위해 사용

      setCrew((state) => {
        return state.filter((e) => e.id != data.crewId);
      });
    });
    socket?.on('outCrew', (data) => {
      //인원 제한시 실시간으로 반영하기 위해 사용

      setCrew((state) => {
        return state.map((e) => {
          if (e.id == data.currentCrew.id) {
            const users = e.users.filter((ee) => ee.nickName != data.nickName);

            delete e.users;
            e['users'] = users;
          }
          return e;
        });
      });
      setCrew((state) => {
        state.some((e) => {
          if (e.id == data.currentCrew.id) {
            e.users.some((ee) => {
              if (ee.nickName == user.nickName) {
                alert(
                  `${data.currentCrew.id}번방의${data.nickName}님이 탈퇴하셨습니다.`
                );
                return true;
              }
              return false;
            });
          }
          // e.users.some((ee) => {
          //   if (ee.nickName == user.nickName) {
          //     alert(
          //       `${data.currentCrew.id}번방의${data.nickName}님이 탈퇴하셨습니다.`
          //     );
          //     return true;
          //   }
          //   return false;
          // });
        });
        return state;
      });
    });

    return () => {
      socket?.off('joinCrew');
      socket?.off('numberInChat');
      socket?.off('outCrew');
      socket?.off('removeCrew');
    };
  }, [currentCrew, change]);

  // 크루 생성 모달 나타나게 하기
  const ModalShow = () => {
    if (!user.id) {
      return alert('로그인 후 이용하세요');
    }
    dispatch(modalShow(true));
  };

  // 크루 삭제
  const crewDel = (v) => {
    axios
      .delete('/crew/crewDel', {
        data: {
          id: v.id,
          image: v.image,
        },
      })
      .then(() => {
        alert('삭제가 완료되었습니다!');
        dispatch(crewChange(true));
        socket?.emit('removeCrew', { crewId: v.id });
      });
  };
  const recentChat = () => {
    if (!user.id) {
      return alert('로그인 후 이용하세요');
    }
    axios.post('/chat/recent', {}).then((res) => {
      if (!res.data?.MatePost_id) {
        return alert('최근 대화가 없습니다');
      }

      currentCrewSet(...crew.filter((e) => e.id == res.data.MatePost_id));
      setDisplay(2);
    });
  };

  return (
    <>
      <NavBar />
      <CrewModal />
      <div className="btnDiv">
        <Button variant="light" onClick={ModalShow}>
          +crew
        </Button>
      </div>

      <div className="chatPage">
        <div className="AllCrewPost">
          {crewPagi.map((e, i) => (
            <div className="crewDiv" key={i}>
              <div
                style={{
                  backgroundImage: `url(${e.image})`,
                  backgroundPosition: 'center',
                }}
                className="crewPost"
                key={i}
                onClick={() => selectCrew(e)}
              ></div>
              <div className="crewPostTitle">
                {/* <h3>{e.title}</h3> */}

                <InfoTitle key={i}>{e.title}</InfoTitle>
                {e.User_nickName == user.nickName ? (
                  <div onClick={() => crewDel(e)}>❎</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {display == 0 ? (
          <div className="defaultChat">
            <div>
              <h2 style={{ textAlign: 'center' }}>Weto</h2>
              <p> Welcome to the Weto!!😊</p>
              <p className="p">
                친구들과 함께 크루를 만들거나 나에게 맞는 크루를 찾아
                가입해보세요.
              </p>
              <p className="p2">
                가입한 크루 :{' '}
                {
                  crew.filter(
                    (e) =>
                      e.users.filter((ee) => ee.nickName == user.nickName)
                        .length == 1
                  ).length
                }{' '}
                CREW
              </p>
              <div className="recentCrew">
                <button onClick={() => recentChat()}>최근 대화</button>
              </div>
            </div>
          </div>
        ) : display == 1 ? (
          <div className="CrewInfoBox">
            <h4>{currentCrew.title}</h4>
            {/* <div className='currentCrewImg'  style={{borderRadius: "10px", backgroundImage: `url(${currentCrew.image})`, backgroundSize: "cover" }}></div> */}
            <img src={currentCrew.image} style={{ width: '65%' }} alt="" />
            <p>{currentCrew.info}</p>
            <p>
              가입 인원수 : {currentCrew.users.length}/{currentCrew.max}
            </p>
            <p>
              채팅 참여중인 인원수 : {numberInChat[currentCrew.id] || 0}/
              {currentCrew.max}
            </p>
            <div>
              <button onClick={() => joinCrew()}>입장</button>
              <button onClick={() => outCrew()}>탈퇴</button>
            </div>
          </div>
        ) : (
          <Chat
            setDisplay={setDisplay}
            currentCrew={currentCrew}
            socket={socket}
            user={user}
            numberInChatSet={numberInChatSet}
          />
        )}
      </div>
      <Pagination
        defaultCurrent={page}
        defaultPageSize={6}
        total={crew.length}
        onChange={(e) => changeNum(e)}
        style={{ width: '70%', textAlign: 'center' }}
      />

      {/* {crew.map((e, i) => (
        <button key={i} onClick={() => selectCrew(e)}>
          게시물
        </button>
      ))} */}
    </>
  );
}
