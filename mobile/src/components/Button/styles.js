import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Button = styled(RectButton)`
  height: 45px;
  background: ${(props) => props.theme.main};
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.light};
  font-weight: bold;
  font-size: 16px;
`;
