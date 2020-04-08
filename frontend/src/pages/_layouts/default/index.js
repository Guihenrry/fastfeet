import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import * as S from './styles';

export default function DefaultLayout({ children }) {
  return (
    <S.Wrapper>
      <Header />
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
