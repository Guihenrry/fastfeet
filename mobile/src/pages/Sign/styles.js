import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.main};

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 244px;
`;

export const Form = styled.View`
  padding: 0 25px;
  margin-top: 40px;

  align-self: stretch;
`;

export const Input = styled.TextInput`
  background: ${(props) => props.theme.light};
  height: 45px;
  padding: 0 20px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  background: ${(props) => props.theme.success};
  margin-top: 15px;
`;
