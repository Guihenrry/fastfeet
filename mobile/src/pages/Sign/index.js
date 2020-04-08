import React, {useContext, useState} from 'react';
import {ThemeContext} from 'styled-components';
import {StatusBar} from 'react-native';

import AuthContext from '~/auth/Context';

import logo from '~/assets/fastfeet.png';
import * as S from './styles';

export default function Sign() {
  const theme = useContext(ThemeContext);
  const {signIn} = useContext(AuthContext);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    await signIn(id);

    setLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.main} />
      <S.Container>
        <S.Logo source={logo} />
        <S.Form>
          <S.Input
            placeholder="Informe seu ID de cadastro"
            value={id}
            onChangeText={setId}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <S.SubmitButton onPress={handleSubmit} loading={loading}>
            Entrar no sistema
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </>
  );
}
