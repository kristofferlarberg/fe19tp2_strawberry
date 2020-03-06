import styled from 'styled-components';

export const ToggleContainer = styled.label`
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 40px;
  cursor: pointer;
  font-size: 0.5rem;
  margin: 0;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  &::after {
    background: #36454f;
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    content: "";
    display: block;
    border-radius: 50%;
    width: 19px;
    height: 19px;
    margin: -4px;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }`

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  margin: 0;
  &:checked + ${ToggleContainer} {
    background: ${({ theme }) => theme.body};
    &::after {
      background: #fff;
      content: "";
      display: block;
      border-radius: 50%;
      width: 19px;
      height: 19px;
      margin-left: 28px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
      transition: 0.2s;
    }
  }
`;
