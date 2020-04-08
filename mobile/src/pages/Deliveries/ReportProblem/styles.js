import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  margin: -70px 20px 0 20px;
  z-index: 1;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 12,
  textAlignVertical: 'top',
})`
  background: #fff;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 16px;
`;
