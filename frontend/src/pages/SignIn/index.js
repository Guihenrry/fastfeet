import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet.svg';

import Input from '~/components/Input';
import * as S from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const [email, setEmail] = useState({
    value: '',
    error: null,
    schema: Yup.string()
      .email('Ops parece que seu e-mail não esta correto.')
      .required('O campo e-mail é obrigatorio.'),
  });

  const [password, setPassword] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('Para acesar você precisa de uma senha.'),
  });

  function validateField(field, setter) {
    try {
      field.schema.validateSync(field.value);

      setter({ ...field, error: null });
      return true;
    } catch (error) {
      setter({ ...field, error: error.errors[0] });
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validEmail = validateField(email, setEmail);
    const validPassword = validateField(password, setPassword);

    if (validEmail && validPassword) {
      dispatch(signInRequest(email.value, password.value));
    }
  }

  return (
    <S.Container>
      <img src={logo} alt="FastFeet" />
      <S.Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="exemplo@email.com"
          label="SEU E-MAIL"
          invalid={!!email.error}
          helpText={email.error}
          value={email.value}
          onChange={event => setEmail({ ...email, value: event.target.value })}
        />
        <Input
          type="password"
          placeholder="*************"
          label="SUA SENHA"
          invalid={!!password.error}
          helpText={password.error}
          value={password.value}
          onChange={event =>
            setPassword({ ...password, value: event.target.value })
          }
        />
        <S.Button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </S.Button>
      </S.Form>
    </S.Container>
  );
}
