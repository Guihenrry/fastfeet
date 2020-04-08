import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const Label = styled.label`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed ${props => props.theme.border};
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
  color: ${props => props.theme.border};
  font-size: 1rem;
  font-weight: bold;
  padding: 5px;

  &:hover {
    border-color: ${props => darken(0.1, props.theme.border)};
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Text = styled.p``;

export const Preview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;
