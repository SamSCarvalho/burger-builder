import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

export const Label = styled.div`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const baseInputCSS = css`
  outline: none;
  width: 100%;
  border: 1px solid #CCC;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #CCC;
  }
`;

export const Input = styled.input`
  ${baseInputCSS}
`;

export const TextArea = styled.textarea`
  ${baseInputCSS}
`;

export const Select = styled.select`
  ${baseInputCSS}
`