import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import crewdata from '../../crewdata.js';
import classes from './ChatBox.module.css';
import CrewInfo from './CrewInfo.jsx';

const MyDiv = styled.div`
  width: 25%;
  height: 35vw;
  background: #faf9f9;
  border: 1px solid #dbdbdb;
  padding-top: 3vw;
`;

export default function ChatBox() {
  const infoShow = useSelector((state) => state.crew.infoShow);

  return (
    <MyDiv>
      <div>
        <div className={classes.mainName}>Weto</div>
        <div className={classes.mainContent}> Welcome to the Weto!!😊</div>
      </div>
    </MyDiv>
  );
}
