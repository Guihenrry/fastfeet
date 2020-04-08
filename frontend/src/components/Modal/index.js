import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Modal({ children, onClickOut }) {
  function handleClickOut(event) {
    if (event.target === event.currentTarget) {
      onClickOut();
    }
  }

  return (
    <S.Container onClick={handleClickOut}>
      <S.Modal>{children}</S.Modal>
    </S.Container>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClickOut: PropTypes.func.isRequired,
};
