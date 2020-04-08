import styled, {css} from 'styled-components/native';

export const Scroll = styled.ScrollView``;

export const Container = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Welcome = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const WelcomeText = styled.Text`
  color: ${(props) => props.theme.textMedium};
  font-size: 12px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 22px;
  font-weight: bold;
`;

export const SignOutButton = styled.TouchableOpacity``;

export const OrdersHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const FilterActions = styled.View`
  flex-direction: row;
`;

export const FilterButton = styled.TouchableOpacity``;

export const FilterButtonText = styled.Text`
  font-size: 12px;
  margin-left: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.medium};

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.main};
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.main};
    `}
`;

export const Order = styled.View`
  margin-bottom: 30px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
`;

export const OrderTop = styled.View`
  padding: 15px;
`;

export const OrderTitleWrraper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const OrderTitle = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.main};
  font-weight: bold;
`;

export const Steps = styled.View`
  margin: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Step = styled.View`
  width: 9px;
  height: 9px;
  border: 1px solid ${(props) => props.theme.main};
  border-radius: 5px;
  background: ${(props) =>
    props.check ? props.theme.main : props.theme.light};
`;

export const StepLine = styled.View`
  position: absolute;
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.main};
`;

export const StepsDescriptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StepsDescriptionsText = styled.Text`
  width: 50px;
  color: ${(props) => props.theme.medium};
  font-size: 8px;
  text-align: center;
`;

export const OrderBottom = styled.View`
  padding: 20px;
  background: ${(props) => props.theme.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Info = styled.View``;

export const InfoLabel = styled.Text`
  font-size: 8px;
  color: ${(props) => props.theme.medium};
`;

export const InfoValue = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 12px;
  font-weight: bold;
`;

export const DetailButton = styled.TouchableOpacity``;

export const DetailButtonText = styled.Text`
  color: ${(props) => props.theme.main};
  font-size: 12px;
  font-weight: bold;
`;
