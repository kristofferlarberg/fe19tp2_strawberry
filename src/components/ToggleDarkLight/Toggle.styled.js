import styled from 'styled-components';

export const ToggleContainer = styled.label`
  background: #dddddd;
  border: 2px solid #797979;
  border-radius: 40px;
  cursor: pointer;
  font-size: 0.5rem;
  margin: 0;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 2.5rem;
  height: 1rem;
  &::after {
    background: #797979;
    border: 2px solid #797979;
    content: "";
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    margin: -7px;
    transition: 0.2s;
  }`

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  &:checked + ${ToggleContainer} {
    background: #797979;
    &::after {
      background: #dddddd;
      border: 2px solid #dddddd;
      content: "";
      display: block;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      margin: -7px;
      margin-left: 13px;
      transition: 0.2s;
      padding: 0;
    }
  }
`;
