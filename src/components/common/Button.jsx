import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  /*공통 스타일*/
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: 000000;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /*크기*/
  height: 2.25rem;
  font-size: 1rem;

  /*색상 */
  background: #ffb2f5;
  &:hover {
    background: #d5d5d5;
  }
  &:active {
    background: #ffb2f5;
  }

  /*기타 */
  & + & {
    margin-left: 1rem;
  }
`;
function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
