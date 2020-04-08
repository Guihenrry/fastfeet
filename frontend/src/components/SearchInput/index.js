import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import * as S from './styles';

import { ReactComponent as Icon } from '~/assets/search.svg';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  function handleClick() {
    history.push(`${pathname}?q=${query}`);
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      history.push(`${pathname}?q=${query}`);
    }
  }

  return (
    <S.Wrapper>
      <S.SearchButton onClick={handleClick}>
        <Icon />
      </S.SearchButton>
      <S.Input
        type="text"
        placeholder="Buscar por encomendas"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </S.Wrapper>
  );
}
