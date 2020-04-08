import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as More } from '~/assets/more.svg';

import * as S from './styles';

export default function Actions({ actions, large }) {
  const [show, setShow] = useState(false);

  function handleClickOut() {
    setShow(false);
    window.removeEventListener('click', handleClickOut);
  }

  function handleButtonClick() {
    if (!show) {
      setShow(true);
      setTimeout(() => {
        window.addEventListener('click', handleClickOut);
      }, 300);
    }
  }

  return (
    <S.Wrraper>
      <S.Button onClick={handleButtonClick}>
        <More />
      </S.Button>

      <S.Actions show={show} large={large}>
        {actions.map(({ label, Icon, onClick }) => (
          <S.ActionsItem key={label} onClick={onClick}>
            <Icon />
            {label}
          </S.ActionsItem>
        ))}
      </S.Actions>

      <S.ActionArrow show={show} />
    </S.Wrraper>
  );
}

Actions.defaultProps = {
  large: false,
};

Actions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      Icon: PropTypes.object.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  large: PropTypes.bool,
};
