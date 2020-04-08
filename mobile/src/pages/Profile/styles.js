import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Scroll = styled.ScrollView`
  flex: 1;
  background: ${(props) => props.theme.light};
`;

export const Container = styled.View`
  padding: 60px 30px 30px 30px;

  align-items: center;
`;

export const Info = styled.ScrollView`
  align-self: stretch;
  margin-top: 40px;
`;

export const LabelText = styled.Text`
  color: ${(props) => props.theme.textMedium};
  font-size: 12px;
`;

export const ValueText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 15px;
`;

export const ButtonLogout = styled(Button)`
  align-self: stretch;
  margin-top: 15px;
  background: ${(props) => props.theme.danger};
`;
