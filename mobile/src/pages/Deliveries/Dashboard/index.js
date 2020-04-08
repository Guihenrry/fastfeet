import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, parseISO} from 'date-fns';

import api from '~/services/api';
import AuthContext from '~/auth/Context';
import Avatar from '~/components/Avatar';
import * as S from './styles';

export default function Dashboard() {
  const {user, signOut} = useContext(AuthContext);
  const [deliveries, setDeliveries] = useState([]);
  const [showDelivered, setShowDelivered] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  async function loadDeliveries() {
    const response = await api.get(`deliveryman/${user.id}/deliveries`, {
      params: {
        delivered: showDelivered,
      },
    });
    setDeliveries(response.data);
  }

  useEffect(() => {
    loadDeliveries();
  }, [showDelivered]);

  function handleNavigationToDetail(order) {
    navigation.navigate('OrderDetails', {order});
  }

  function handleToggleShowDelivered() {
    setShowDelivered(!showDelivered);
  }

  return (
    user && (
      <S.Scroll>
        <S.Container>
          <S.Header>
            <Avatar name={user.name} url={user.avatar?.url} small />
            <S.Welcome>
              <S.WelcomeText>Bem vindo de volta,</S.WelcomeText>
              <S.Title>{user.name}</S.Title>
            </S.Welcome>
            <S.SignOutButton onPress={signOut}>
              <Icon name="exit-to-app" size={24} color={theme.danger} />
            </S.SignOutButton>
          </S.Header>

          <S.OrdersHeader>
            <S.Title>Entregas</S.Title>
            <S.FilterActions>
              <S.FilterButton onPress={handleToggleShowDelivered}>
                <S.FilterButtonText active={!showDelivered}>
                  Pendentes
                </S.FilterButtonText>
              </S.FilterButton>

              <S.FilterButton onPress={handleToggleShowDelivered}>
                <S.FilterButtonText active={showDelivered}>
                  Entregues
                </S.FilterButtonText>
              </S.FilterButton>
            </S.FilterActions>
          </S.OrdersHeader>

          {deliveries.map((order) => (
            <S.Order key={order.id}>
              <S.OrderTop>
                <S.OrderTitleWrraper>
                  <Icon name="local-shipping" size={24} color={theme.main} />
                  <S.OrderTitle>Encomenda {order.id}</S.OrderTitle>
                </S.OrderTitleWrraper>

                <S.Steps>
                  <S.StepLine></S.StepLine>
                  <S.Step check />
                  <S.Step check={order.start_date} />
                  <S.Step check={order.end_date} />
                </S.Steps>

                <S.StepsDescriptions>
                  <S.StepsDescriptionsText>
                    Aguardando Retirada
                  </S.StepsDescriptionsText>
                  <S.StepsDescriptionsText>Retirada</S.StepsDescriptionsText>
                  <S.StepsDescriptionsText>Entregue</S.StepsDescriptionsText>
                </S.StepsDescriptions>
              </S.OrderTop>

              <S.OrderBottom>
                <S.Info>
                  <S.InfoLabel>Data</S.InfoLabel>
                  <S.InfoValue>
                    {format(
                      parseISO(
                        order.end_date || order.start_date || order.createdAt
                      ),
                      'dd/MM/yyyy'
                    )}
                  </S.InfoValue>
                </S.Info>

                <S.Info>
                  <S.InfoLabel>Cidade</S.InfoLabel>
                  <S.InfoValue>{order.recipient?.city}</S.InfoValue>
                </S.Info>

                <S.DetailButton onPress={() => handleNavigationToDetail(order)}>
                  <S.DetailButtonText>Ver detalhes</S.DetailButtonText>
                </S.DetailButton>
              </S.OrderBottom>
            </S.Order>
          ))}
        </S.Container>
      </S.Scroll>
    )
  );
}
