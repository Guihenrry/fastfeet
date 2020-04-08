import styled from 'styled-components/native';

export const Avatar = styled.Image`
  width: ${(props) => (props.small ? '68px' : '140px')};
  height: ${(props) => (props.small ? '68px' : '140px')};
  border-radius: 70px;
  background: ${(props) => props.theme.lightBackground};
`;

export const NullState = styled.View`
  width: ${(props) => (props.small ? '68px' : '140px')};
  height: ${(props) => (props.small ? '68px' : '140px')};
  border-radius: 70px;
  background: ${(props) => props.theme.lightBackground};

  align-items: center;
  justify-content: center;
`;

export const NullStateText = styled.Text`
  color: ${(props) => props.theme.lightMain};
  font-size: ${(props) => (props.small ? '31px' : '60px')};
`;
