import styled from 'styled-components';

export const NullState = styled.span`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
