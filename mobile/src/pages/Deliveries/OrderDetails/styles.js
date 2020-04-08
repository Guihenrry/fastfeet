import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: -70px 20px 0 20px;
  z-index: 1;
`;

export const InfoDelivery = styled.View`
  background: #fff;
  padding: 15px 15px 0 15px;
  elevation: 1.5;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  margin-left: 5px;
  color: ${(props) => props.theme.main};
  font-size: 14px;
  font-weight: bold;
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.medium};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const Value = styled.Text`
  color: ${(props) => props.theme.textMedium};
  font-size: 14px;
  margin-bottom: 15px;
`;

export const Dates = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Date = styled.View``;

export const Actions = styled.View`
  background: ${(props) => props.theme.background};
  margin-bottom: 20px;
  elevation: 1.5;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 20px 0;
  display: flex;
  align-items: center;

  ${(props) =>
    props.border &&
    css`
      border-color: rgba(0, 0, 0, 0.1);
      border-left-width: 1px;
      border-right-width: 1px;
    `}

  flex: 1;
`;

export const ActionButtonText = styled.Text`
  text-align: center;
`;
