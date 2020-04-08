import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as Exit } from '~/assets/exit.svg';
import { ReactComponent as Delivery } from '~/assets/delivery.svg';
import { ReactComponent as Order } from '~/assets/order.svg';
import { ReactComponent as Recipient } from '~/assets/recipient.svg';
import { ReactComponent as Problem } from '~/assets/problem.svg';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet.svg';
import logoMobile from '~/assets/fastfeet-mobile.svg';
import * as S from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <S.Header>
      <S.LogoLink to="/orders">
        <S.Logo src={logo} alt="Fastfeet" />
        <S.LogoMobile src={logoMobile} alt="FastFeet" />
      </S.LogoLink>

      <S.Menu>
        <S.MenuList>
          <S.MenuItem>
            <S.MenuLink
              to="/orders"
              activeClassName="active"
              title="Encomendas"
            >
              Encomendas
              <Delivery />
            </S.MenuLink>
          </S.MenuItem>
          <S.MenuItem>
            <S.MenuLink
              to="/deliverymans"
              activeClassName="active"
              title="Entregadores"
            >
              Entregadores
              <Order />
            </S.MenuLink>
          </S.MenuItem>
          <S.MenuItem>
            <S.MenuLink
              to="/recipients"
              activeClassName="active"
              title="Destinatarios"
            >
              Destinatarios
              <Recipient />
            </S.MenuLink>
          </S.MenuItem>
          <S.MenuItem>
            <S.MenuLink
              to="/problems"
              activeClassName="active"
              title="Problemas"
            >
              Problemas
              <Problem />
            </S.MenuLink>
          </S.MenuItem>
        </S.MenuList>
      </S.Menu>

      <S.Actions>
        <S.UserName>Admin FastFeet</S.UserName>
        <S.ButtonSignOut type="button" onClick={handleSignOut}>
          Sair do sistema
          <Exit />
        </S.ButtonSignOut>
      </S.Actions>
    </S.Header>
  );
}
