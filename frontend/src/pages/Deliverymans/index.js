import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import api from '~/services/api';

import Button from '~/components/Button';
import SearchInput from '~/components/SearchInput';
import Avatar from '~/components/Avatar';
import Actions from '~/components/Actions';

import { ReactComponent as Add } from '~/assets/add.svg';
import { ReactComponent as Edit } from '~/assets/edit.svg';
import { ReactComponent as Delete } from '~/assets/delete.svg';

import * as S from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const query = useQuery();
  const history = useHistory();

  const q = useMemo(() => query.get('q'), [query]);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get(
        q ? `/deliverymans?q=${q}` : '/deliverymans'
      );

      setDeliverymans(response.data);
    }

    loadDeliverymans();
  }, [q]);

  function handleEditClick(id) {
    history.push(`/deliverymans/edit/${id}`);
  }

  function handleDeleteClick(id) {
    setDeliverymans(deliverymans.filter(deliveryman => deliveryman.id !== id));
    api.delete(`/deliverymans/${id}`);
  }

  return (
    <S.Container>
      <S.Title>Gerenciando entregadores</S.Title>
      <S.Actions>
        <SearchInput />
        <Button icon={Add} to="/deliverymans/register">
          Cadastrar
        </Button>
      </S.Actions>

      <S.Table>
        <S.TableHeader>
          <strong>ID</strong>
          <strong>Foto</strong>
          <strong>Nome</strong>
          <strong>Email</strong>
          <strong>Ações</strong>
        </S.TableHeader>
        <TransitionGroup>
          {deliverymans.map(deliveryman => (
            <CSSTransition
              key={deliveryman.id}
              timeout={500}
              classNames="anima"
            >
              <S.TableRow>
                <p>
                  <S.ColumnTitle>ID:</S.ColumnTitle> #{deliveryman.id}
                </p>
                <S.AvatarWrraper>
                  <Avatar
                    name={deliveryman.name}
                    url={deliveryman.avatar?.url}
                  />
                </S.AvatarWrraper>
                <p>
                  <S.ColumnTitle>Nome:</S.ColumnTitle> {deliveryman.name}
                </p>
                <p>
                  <S.ColumnTitle>Email:</S.ColumnTitle> {deliveryman.email}
                </p>
                <S.ActionsWrraper>
                  <Actions
                    actions={[
                      {
                        label: 'Editar',
                        Icon: Edit,
                        onClick: () => handleEditClick(deliveryman.id),
                      },
                      {
                        label: 'Excluir',
                        Icon: Delete,
                        onClick: () => handleDeleteClick(deliveryman.id),
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
