import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  margin: -70px 20px 0 20px;
  z-index: 1;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.light};
  margin-bottom: 10px;
`;

export const Problem = styled.View`
  background: ${(props) => props.theme.light};
  padding: 15px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.border};
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProblemDescription = styled.Text`
  flex: 1;
  font-weight: bold;
  color: ${(props) => props.theme.medium};
  font-size: 16px;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.textLight};
`;
