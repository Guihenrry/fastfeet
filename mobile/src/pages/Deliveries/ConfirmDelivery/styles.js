import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  z-index: 1;
  margin: -70px 20px 0 20px;
`;

export const CameraWrraper = styled.View`
  flex: 1;
  overflow: hidden;
  border-radius: 4px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;

export const TakeButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-30px);
`;

export const SubmitButton = styled(Button)`
  margin: 15px 0;
`;

export const Preview = styled.Image`
  width: 100%;
  flex: 1;
`;
