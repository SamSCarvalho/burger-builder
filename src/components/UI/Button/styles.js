import styled from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;

  &.Success {
    color: #5C9210;
  }

  &.Danger {
    color: #944317;
  }

  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  &:disabled {
    color: #CCC;
    cursor: not-allowed;
  }
`;