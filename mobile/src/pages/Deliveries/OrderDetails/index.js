import React, {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {ThemeContext} from 'styled-components';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, parseISO} from 'date-fns';

import * as S from './styles';

export default function OrderDetails() {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const {params} = useRoute();
  const {order} = params;

  function handleReportProblem(id) {
    navigation.navigate('ReportProblem', {id});
  }

  function handleViewProblem(id) {
    navigation.navigate('ViewProblem', {id});
  }

  function handleConfirmDelivery(id) {
    navigation.navigate('ConfirmDelivery', {id});
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.main} />
      <S.Container>
        <S.InfoDelivery>
          <S.TitleWrapper>
            <Icon name="local-shipping" color={theme.main} size={24} />
            <S.Title>Informações da entrega</S.Title>
          </S.TitleWrapper>

          <S.Label>Destinatário</S.Label>
          <S.Value>{order.recipient?.name}</S.Value>

          <S.Label>Endereço de entrega</S.Label>
          <S.Value>
            {order.recipient &&
              `${order.recipient.street}, ${order.recipient.number}, ${order.recipient.complement},  ${order.recipient.city} - ${order.recipient.state}, ${order.recipient.zip_code} `}
          </S.Value>

          <S.Label>Produto</S.Label>
          <S.Value>{order.recipient?.name}</S.Value>
        </S.InfoDelivery>

        <S.InfoDelivery>
          <S.TitleWrapper>
            <Icon name="event" color={theme.main} size={24} />
            <S.Title>Situação da entrega</S.Title>
          </S.TitleWrapper>

          <S.Label>Status</S.Label>
          <S.Value>{order.end_date ? 'Entregue' : 'Pendente'}</S.Value>

          <S.Dates>
            <S.Date>
              <S.Label>Data de retirada</S.Label>
              <S.Value>
                {order.start_date
                  ? format(parseISO(order.start_date), 'dd/MM/yyyy')
                  : '- - / - - / - -'}
              </S.Value>
            </S.Date>

            <S.Date>
              <S.Label>Data de entrega</S.Label>
              <S.Value>
                {order.end_date
                  ? format(parseISO(order.end_date), 'dd/MM/yyyy')
                  : '- - / - - / - -'}
              </S.Value>
            </S.Date>
          </S.Dates>
        </S.InfoDelivery>

        <S.Actions>
          <S.ActionButton onPress={() => handleReportProblem(order.id)}>
            <Icon name="highlight-off" size={24} color={theme.danger} />
            <S.ActionButtonText>Informar Problema</S.ActionButtonText>
          </S.ActionButton>

          <S.ActionButton border onPress={() => handleViewProblem(order.id)}>
            <Icon name="info-outline" size={24} color={theme.info} />
            <S.ActionButtonText>Visualizar Problemas</S.ActionButtonText>
          </S.ActionButton>

          {!order.end_date && (
            <S.ActionButton onPress={() => handleConfirmDelivery(order.id)}>
              <Icon name="alarm-on" size={24} color={theme.main} />
              <S.ActionButtonText>Confirmar Entrega</S.ActionButtonText>
            </S.ActionButton>
          )}
        </S.Actions>
      </S.Container>
    </>
  );
}
