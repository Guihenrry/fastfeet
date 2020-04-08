import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Button({
  children,
  icon: Icon,
  secondary,
  onClick,
  to,
  disabled,
}) {
  return to ? (
    <S.ButtonLink to={to} secondary={secondary ? 1 : 0}>
      {Icon && <Icon />}
      {children}
    </S.ButtonLink>
  ) : (
    <S.Button
      secondary={secondary ? 1 : 0}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon />}
      {children}
    </S.Button>
  );
}

Button.defaultProps = {
  icon: null,
  secondary: false,
  onClick() {},
  to: '',
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.shape({ render: PropTypes.func }),
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  disabled: PropTypes.bool,
};
