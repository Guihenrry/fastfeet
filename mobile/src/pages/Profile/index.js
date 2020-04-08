import React, {useContext} from 'react';
import {format, parseISO} from 'date-fns';

import AuthContext from '~/auth/Context';

import Avatar from '~/components/Avatar';

import * as S from './styles';

export default function Profile() {
  const {user, signOut} = useContext(AuthContext);

  return (
    user && (
      <S.Scroll>
        <S.Container>
          <Avatar name={user.name} url={user.avatar?.url} />
          <S.Info>
            <S.LabelText>Nome completo</S.LabelText>
            <S.ValueText>{user.name}</S.ValueText>

            <S.LabelText>Email</S.LabelText>
            <S.ValueText>{user.email}</S.ValueText>

            <S.LabelText>Data de cadastro</S.LabelText>
            <S.ValueText>
              {format(parseISO(user.created_at), 'dd/MM/yyyy')}
            </S.ValueText>
          </S.Info>
          <S.ButtonLogout type="button" onPress={signOut}>
            Logout
          </S.ButtonLogout>
        </S.Container>
      </S.Scroll>
    )
  );
}
