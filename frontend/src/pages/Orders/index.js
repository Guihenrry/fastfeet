import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';
import * as S from './styles';
import Button from '~/components/Button';
import SearchInput from '~/components/SearchInput';
import Avatar from '~/components/Avatar';
import Status from '~/components/Status';
import Actions from '~/components/Actions';
import Modal from '~/components/Modal';

import { ReactComponent as View } from '~/assets/view.svg';
import { ReactComponent as Edit } from '~/assets/edit.svg';
import { ReactComponent as Delete } from '~/assets/delete.svg';

import { ReactComponent as Add } from '~/assets/add.svg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderView, setOrderView] = useState(null);
  const query = useQuery();
  const history = useHistory();

  const q = useMemo(() => query.get('q'), [query]);

  function getOrderStatus(order) {
    if (order.canceled_at) return 'CANCELADA';

    if (order.end_date) return 'ENTREGUE';

    if (order.start_date) return 'RETIRADA';

    return 'PENDENTE';
  }

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(q ? `/orders?q=${q}` : '/orders');

      const data = response.data.map(order => ({
        ...order,
        status: getOrderStatus(order),
      }));

      setOrders(data);
    }

    loadOrders();
  }, [q]);

  function handleEditClick(id) {
    history.push(`/orders/edit/${id}`);
  }

  function handleDeleteClick(id) {
    setOrders(orders.filter(order => order.id !== id));
    api.delete(`/orders/${id}`);
  }

  function handleViewClick(order) {
    setShowModal(true);
    setOrderView(order);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <S.Container>
      {showModal && (
        <Modal onClickOut={closeModal}>
          <>
            {orderView.recipient && (
              <S.ModalContent>
                <S.ModalContentTitle>
                  Informações da encomenda
                </S.ModalContentTitle>
                <S.ModalContentText>
                  {orderView.recipient.street}, {orderView.recipient.number}
                </S.ModalContentText>
                <S.ModalContentText>
                  {orderView.recipient.complement}
                </S.ModalContentText>
                <S.ModalContentText>
                  {orderView.recipient.zip_code}
                </S.ModalContentText>
              </S.ModalContent>
            )}

            {(orderView.canceled_at ||
              orderView.start_date ||
              orderView.end_date) && (
              <S.ModalContent>
                <S.ModalContentTitle>Datas</S.ModalContentTitle>
                {orderView.start_date && (
                  <S.ModalContentText>
                    <strong>Retirada: </strong>
                    {format(parseISO(orderView.start_date), 'dd/MM/yyyy')}
                  </S.ModalContentText>
                )}

                {orderView.end_date && (
                  <S.ModalContentText>
                    <strong>Entrega: </strong>
                    {format(parseISO(orderView.end_date), 'dd/MM/yyyy')}
                  </S.ModalContentText>
                )}

                {orderView.canceled_at && (
                  <S.ModalContentText>
                    <strong>Cancelamento: </strong>
                    {format(parseISO(orderView.canceled_at), 'dd/MM/yyyy')}
                  </S.ModalContentText>
                )}
              </S.ModalContent>
            )}

            {orderView.signature && (
              <S.ModalContent>
                <S.ModalContentTitle>
                  Assinatura do destinatário
                </S.ModalContentTitle>
                <img src={orderView.signature.url} alt="Assinatura" />
              </S.ModalContent>
            )}
          </>
        </Modal>
      )}

      <S.Title>Gerenciando encomendas</S.Title>
      <S.Actions>
        <SearchInput />
        <Button icon={Add} to="/orders/register">
          Cadastrar
        </Button>
      </S.Actions>

      <S.Table>
        <S.TableHeader>
          <strong>ID</strong>
          <strong>Destinatário</strong>
          <strong>Entregador</strong>
          <strong>Cidade</strong>
          <strong>Estado</strong>
          <strong>Status</strong>
          <strong>Ações</strong>
        </S.TableHeader>
        <TransitionGroup>
          {orders.map(order => (
            <CSSTransition key={order.id} timeout={500} classNames="anima">
              <S.TableRow>
                <p>
                  <S.ColumnTitle>ID: </S.ColumnTitle>#{order.id}
                </p>

                <p>
                  <S.ColumnTitle>Destinatário: </S.ColumnTitle>
                  {order.recipient.name}
                </p>

                <S.Deliveryman>
                  {order.deliveryman ? (
                    <>
                      <Avatar
                        name={order.deliveryman.name}
                        url={order.deliveryman.avatar?.url}
                      />
                      <span>{order.deliveryman.name}</span>
                    </>
                  ) : (
                    <p>undefined</p>
                  )}
                </S.Deliveryman>

                <p>
                  <S.ColumnTitle>Cidade: </S.ColumnTitle>
                  {order.recipient.city}
                </p>

                <p>
                  <S.ColumnTitle>Estado: </S.ColumnTitle>
                  {order.recipient.state}
                </p>

                <p>
                  <Status type={order.status} />
                </p>
                <S.ActionsWrraper>
                  <Actions
                    actions={[
                      {
                        label: 'Visualizar',
                        Icon: View,
                        onClick: () => handleViewClick(order),
                      },
                      {
                        label: 'Editar',
                        Icon: Edit,
                        onClick: () => handleEditClick(order.id),
                      },
                      {
                        label: 'Excluir',
                        Icon: Delete,
                        onClick: () => handleDeleteClick(order.id),
                      },
                    ]}
                  />
                </S.ActionsWrraper>
              </S.TableRow>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </S.Table>
    </S.Container>
  );
}
