import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import api from '~/services/api';

import Button from '~/components/Button';
import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions';

import { ReactComponent as Add } from '~/assets/add.svg';
import { ReactComponent as Edit } from '~/assets/edit.svg';
import { ReactComponent as Delete } from '~/assets/delete.svg';

import * as S from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Recipients() {
  const history = useHistory();
  const [recipients, setRecipients] = useState([]);
  const query = useQuery();
  const q = useMemo(() => query.get('q'), [query]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get(q ? `/recipients?q=${q}` : '/recipients');

      setRecipients(response.data);
    }

    loadRecipients();
  }, [q]);

  function handleEditClick(id) {
    history.push(`/recipients/edit/${id}`);
  }

  function handleDeleteClick(id) {
    setRecipients(recipients.filter(recipient => recipient.id !== id));
    api.delete(`/recipients/${id}`);
  }

  return (
    <S.Container>
      <S.Title>Gerenciando destinatários</S.Title>
      <S.Actions>
        <SearchInput />
        <Button icon={Add} to="/recipients/register">
          Cadastrar
        </Button>
      </S.Actions>

      <S.Table>
        <S.TableHeader>
          <strong>ID</strong>
          <strong>Nome</strong>
          <strong>Endereço</strong>
          <strong>Ações</strong>
        </S.TableHeader>

        <TransitionGroup>
          {recipients.map(recipient => (
            <CSSTransition key={recipient.id} timeout={500} classNames="anima">
              <S.TableRow>
                <p>
                  <S.ColumnTitle>ID:</S.ColumnTitle>#{recipient.id}
                </p>
                <p>
                  <S.ColumnTitle>Nome:</S.ColumnTitle>
                  {recipient.name}
                </p>
                <p>
                  <S.ColumnTitle>Endereço:</S.ColumnTitle>
                  {`${recipient.street}, ${recipient.number}, ${recipient.complement}, ${recipient.state} - ${recipient.city}`}
                </p>
                <S.ActionsWrraper>
                  <Actions
                    actions={[
                      {
                        label: 'Editar',
                        Icon: Edit,
                        onClick: () => handleEditClick(recipient.id),
                      },
                      {
                        label: 'Excluir',
                        Icon: Delete,
                        onClick: () => handleDeleteClick(recipient.id),
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
