import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {ThemeContext} from 'styled-components';

import logo from '~/assets/fastfeet.png';
import * as S from './styles';

export default function SplashScreen() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.main} />
      <S.Container>
        <S.Logo source={logo} />
      </S.Container>
    </>
  );
}
