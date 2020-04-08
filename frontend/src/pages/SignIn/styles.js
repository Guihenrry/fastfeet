import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.section`
  background: ${props => props.theme.light};
  width: 100%;
  max-width: 360px;
  padding: 60px 30px;

  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  margin-top: 40px;
`;

export const Button = styled.button`
  border: 0;
  background: ${props => props.theme.main};
  color: ${props => props.theme.light};
  padding: 12px;
  width: 100%;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background: ${props => darken(0.1, props.theme.main)};
  }
`;
