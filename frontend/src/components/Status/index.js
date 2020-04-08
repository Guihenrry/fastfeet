import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Status({ type }) {
  return <S.Status type={type}>{type}</S.Status>;
}

Status.propTypes = {
  type: PropTypes.string.isRequired,
};
