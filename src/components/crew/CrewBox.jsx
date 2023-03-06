// import React, { useEffect, useState } from 'react';
// import crewdata from '../../crewdata.js';
// // import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import classes from './CrewBox.module.css';
// import { io } from 'socket.io-client';
// import ChatBox from './ChatBox.jsx';
// import {
//   crewChange,
//   crewPagination,
//   detailShow,
//   infoShow,
// } from '../../store/modules/crew';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Pagination } from 'antd';

// const DivCrewBox = styled.div`
//   position: relative;
//   margin: 0 70px;
//   top: 20%;
//   display: flex;
// `;
// const InfoTitle = styled.div`
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   display: inline-block;
// `;

// // 소켓 연결
// // let socket = io.connect('http://localhost:8000');

// const CrewBox = () => {
//   const crew = useSelector((state) => state.crew.crewInfo);
//   // console.log('crew', crew);
//   const user = useSelector((state) => state.user.userInfo);
//   //
//   const page = useSelector((state) => state.crew.page);
//   const crewPagi = crew.slice(page * 6, page * 6 + 6);

//   const dispatch = useDispatch();
//   useEffect(() => {}, [crew]);
//   useEffect(() => {
//     dispatch(crewPagination(0));
//   }, []);

//   const handleClickButton = (v) => {
//     dispatch(infoShow(true));
//     dispatch(detailShow(v));
//   };

//   const CrewDel = (v) => {
//     axios
//       .delete('/crew/crewDel', {
//         data: {
//           id: v.id,
//           image: v.image,
//         },
//       })
//       .then(() => {
//         alert('삭제가 완료되었습니다!');
//         dispatch(crewChange(true));
//       });
//   };

//   const changePage = (e) => dispatch(crewPagination(e - 1));

//   return (
//     <>
//       <DivCrewBox>
//         <div className={classes.crewBoxContainer}>
//           {crewPagi.map((v, i) => (
//             <React.Fragment key={i}>
//               <div className={classes.crewBox}>
//                 <img
//                   alt="img"
//                   src={v.image}
//                   className={classes.crewImg}
//                   onClick={() => handleClickButton(v)}
//                 />
//                 <InfoTitle
//                   // variant="light"
//                   className={classes.crewBtn}
//                   // onClick={() => handleClickButton(v)}
//                   key={i}
//                 >
//                   {v.title}
//                 </InfoTitle>
//                 {user.nickName === v.User_nickName ? (
//                   <button className={classes.delBtn} onClick={() => CrewDel(v)}>
//                     x
//                   </button>
//                 ) : (
//                   true
//                 )}
//               </div>
//             </React.Fragment>
//           ))}
//         </div>

//         <div className={classes.mainChatBox}>
//           <ChatBox socket={socket} />
//         </div>
//       </DivCrewBox>

//       <Pagination
//         defaultCurrent={page}
//         defaultPageSize={6}
//         total={crew.length}
//         onChange={(e) => changePage(e)}
//       />
//     </>
//   );
// };

// export default CrewBox;
