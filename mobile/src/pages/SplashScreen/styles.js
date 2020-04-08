import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.main};

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 244px;
`;
