import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Actions from '~/components/Actions';
import Modal from '~/components/Modal';

import { ReactComponent as View } from '~/assets/view.svg';
import { ReactComponent as Delete } from '~/assets/delete.svg';

import * as S from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [problemView, setProblemView] = useState('');

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/delivery/problems');

      const data = response.data.map(problem => ({
        ...problem,
        resumeDescription:
          problem.description.length > 100
            ? `${problem.description.substring(0, 100)}...`
            : problem.description,
      }));

      setProblems(data);
    }

    loadProblems();
  }, []);

  function handleViewClick(problem) {
    setShowModal(true);
    setProblemView(problem);
  }

  async function handleCancelClick(id) {
    await api.delete(`/problem/${id}/cancel-delivery`);
    toast.success(`Encomenda #${id} cancelada com sucesso!`);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <S.Container>
      {showModal && (
        <Modal onClickOut={closeModal}>
          <>
            <S.ModalTitle>Visualizar problema</S.ModalTitle>
            <S.ModalContent>{problemView?.description}</S.ModalContent>
          </>
        </Modal>
      )}
      <S.Title>Problemas na entrega</S.Title>
      <S.Table>
        <S.TableHeader>
          <strong>Encomenda</strong>
          <strong>Problema</strong>
          <strong>Ações</strong>
        </S.TableHeader>
        <TransitionGroup>
          {problems.map(problem => (
            <CSSTransition key={problem.id} timeout={500} classNames="anima">
              <S.TableRow>
                <p>
                  <S.ColumnTitle>Encomenda: </S.ColumnTitle> #
                  {problem.delivery_id}
                </p>
                <p>
                  <S.ColumnTitle>Problema: </S.ColumnTitle>
                  {problem.resumeDescription}
                </p>
                <S.ActionsWrraper>
                  <Actions
                    large
                    actions={[
                      {
                        label: 'Visualizar',
                        Icon: View,
                        onClick: () => handleViewClick(problem),
                      },
                      {
                        label: 'Cancelar encomenda',
                        Icon: Delete,
                        onClick: () => handleCancelClick(problem.id),
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
