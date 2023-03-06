import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './chat.css';

export default function Chat({
  user,
  setDisplay,
  currentCrew,
  socket,
  numberInChatSet,
}) {
  console.log('user', user);
  console.log('ChatComponent');
  console.log(socket, socket?.id); //왜 소켓아이디는 안뜨냐
  const socketId = socket?.id;
  const [chatting, setChatting] = useState([]);
  console.log(chatting);
  const inputValue = useRef(null);

  const room = useRef();
  // const [more, setMore] = useState(true)

  const [firstLoad, setFirstLoad] = useState(false);
  const [sendMessageTime, setSendMessageTime] = useState(true);

  const [scrollHeight, setScrollHeight] = useState(null);
  console.log(scrollHeight);

  // useEffect(() => {}, [firstLoad, sendMessageTime]);

  async function ChattingListLoad() {
    console.log('ChattingListLoad', user.id);
    const data = await axios({
      method: 'post',
      url: `/chat/load`,
      data: {
        currentCrew: currentCrew.id,
        // id : user.id, //닉네임을 하고 싶었지만 중간테이블이여서 자동 id값으로 들어간다.
        // nickName: user.nickName
      },
    });
    const chatlist = data.data
      .map((e) => {
        if (e.User_nickName == user.nickName) {
          e['liClassName'] = 'myMessage';
        } else {
          e['liClassName'] = 'yourMessage';
          e['divClassName'] = 'yourProfile';
        }
        return e;
      })
      .reverse();
    console.log(chatlist);
    setChatting(chatlist);
    setFirstLoad(true);
  }

  let notChatLoading = useRef(true);
  async function moreChattinglist() {
    console.log('notChatLoading.current', notChatLoading.current);
    if (!notChatLoading.current && room.current.scrollTop == 0) {
      return alert('더 이상 대화내용이 없습니다!');
    }
    console.log(room.current.scrollTop);
    console.log(room.current.clientHeight);
    console.log(room.current.scrollHeight);
    if (
      notChatLoading.current &&
      room.current.scrollTop + room.current.clientHeight <
        room.current.scrollHeight -
          (room.current.scrollHeight - room.current.clientHeight) * 0.83
    ) {
      notChatLoading.current = false;
      console.log(chatting[0]);

      const data = await axios({
        method: 'post',
        url: `/chat/load`,
        data: {
          currentCrew: currentCrew.id,
          id: user.id, //닉네임을 하고 싶었지만 중간테이블이여서 자동 id값으로 들어간다.
          nickName: user.nickName,
          offset: chatting[0].id,
        },
      });
      console.log(data);
      if (data.data.length < 20) {
        notChatLoading.current = false;
      } else {
        notChatLoading.current = true;
      }
      setSendMessageTime(false);
      setChatting((state) => {
        return [...data.data.reverse(), ...state];
      });
    }
  }

  useEffect(() => {
    room.current.addEventListener('scroll', moreChattinglist);
    console.log(sendMessageTime);
    if (sendMessageTime) {
      room.current.scrollTop = room.current.scrollHeight;
    } else {
      console.log(scrollHeight);
      console.log(room.current.scrollHeight);
      room.current.scrollTop = scrollHeight;
      setScrollHeight((state) => {
        return scrollHeight;
      }); //채팅 더 보기
    }
    return () => {
      room.current?.removeEventListener('scroll', moreChattinglist);
    };
    //왜 안되지
  }, [chatting]);

  useEffect(() => {
    ChattingListLoad();
    console.log('notice useEffet');
    setScrollHeight(room.current.scrollHeight);
    socket?.emit('notice', { nickName: user.nickName, currentCrew });
    socket?.on('notice', (data) => {
      console.log('notice', data);
      if (data.chat.split('님')[0] != 'undefined') {
        // data['User_nickName'] = user.nickName;
        setChatting((chatting) => [...chatting, data]);
      }
      //chat페이지에서 새로고침시에 disconnect가 발생하는데 화면에 그리지 않기 위해 조건사용
    });
    socket?.emit('join', { currentCrew: currentCrew.id });
    socket?.on('newMsg', (data) => {
      console.log(121212321);
      console.log(data);
      if (socketId == data.from) {
        data['liClassName'] = 'myMessage';
      } else {
        data['liClassName'] = 'yourMessage';
        data['divClassName'] = 'yourProfile';
      }
      setSendMessageTime(true);
      setChatting((chat) => [...chat, data]);
      console.log(room.current.scrollTop);
      console.log(room.current.scrollHeight);
      // room.current.scrollTop = room.current.scrollHeight;
    });
    //room을 선택해 입장을 누르면 컴포넌트가 마운트 되면서 방에 입장
    return () => {
      socket?.off('notice');
      socket?.off('newMsg');
    };
  }, []);
  //소켓이 변한다는건 다른 유저가 들어왔다는 거다 그래서 변할 때마다 공지를 해준다.

  const sendMessage = async () => {
    if (inputValue.current.value == '') {
      return;
    }
    socket?.emit('sendMsg', {
      chat: inputValue.current.value,
      nickName: user.nickName,
      currentCrew,
    }); //게시물 id도 같이 보내야한다.

    const data = await axios({
      method: 'post',
      url: '/chat/message',
      data: {
        chat: inputValue.current.value,
        nickName: user.nickName,
        room: currentCrew.id,
      },
    });
    inputValue.current.value = '';
  };
  // const SelectOnChange = (e) => setTo(e.target.value);
  const enter = (e) => {
    if (e.keyCode == 13) {
      sendMessage();
      e.preventDefault();
    }
  };
  return (
    <div className="relative">
      <div ref={room} className="room">
        <div className="roomTitle">{currentCrew.title}</div>
        <ul>
          {chatting.map((data, i, chatlist) => {
            return data.type == 'notice' ? (
              <p key={i}>{data.chat}</p>
            ) : data.User_nickName == user.nickName ? (
              <li className="myMessage" key={i}>
                <p>{data.chat}</p>
              </li>
            ) : chatlist[i - 1]?.User_nickName == data.User_nickName ? ( //마지막채팅이 같은 유저라면 chat만 띄우기 아니면 이미지랑 같이
              <li className="yourMessage" key={i}>
                <p>{data.chat}</p>
              </li>
            ) : (
              <li className="yourMessage" key={i}>
                <div className="yourProfile">
                  <img
                    src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"
                    width="40"
                    height="40"
                    alt=""
                  />
                  <h3>{data.User_nickName}</h3>
                </div>
                <p>{data.chat}</p>
              </li>
            );
          })}
        </ul>
        <form action="">
          <input
            ref={inputValue}
            type="text"
            id="msg_box"
            onKeyDown={(e) => enter(e)}
          />
          <button type="button" onClick={() => sendMessage()}>
            입력
          </button>
        </form>
      </div>
      {/* <button
        className="exit"
        onClick={() => {
          console.log('out');
          console.log(currentCrew.id);
          console.log(user.nickName);
          setDisplay((state) => !state);
          socket?.emit('roomOut', {
            currentCrewId: currentCrew.id,
            nickName: user.nickName,
          });
        }}
      >
        나가기
      </button> */}
    </div>
  );
}
