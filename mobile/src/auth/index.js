import React, {useReducer, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from './Context';
import api from '~/services/api';

export default function Auth({children}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            isLoading: false,
            isSigned: action.isSigned,
            user: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSigned: true,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSigned: false,
            user: null,
          };
        default:
          return state;
      }
    },
    {
      isLoading: true,
      isSigned: false,
      user: null,
    }
  );

  useEffect(() => {
    async function bootstrapAsync() {
      const userStorage = JSON.parse(await AsyncStorage.getItem('user'));
      const isSignedStorage = JSON.parse(
        await AsyncStorage.getItem('isSigned')
      );

      dispatch({
        type: 'RESTORE_USER',
        isSigned: isSignedStorage,
        user: userStorage,
      });
    }

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (id) => {
        try {
          const response = await api.get(`deliverymans/${id}`);
          await AsyncStorage.setItem('isSigned', JSON.stringify(true));
          await AsyncStorage.setItem('user', JSON.stringify(response.data));
          dispatch({type: 'SIGN_IN', user: response.data});
        } catch (error) {
          Alert.alert(
            'Ops algo deu errado',
            'Verifique seus dados e tente novamente'
          );
        }
      },
      signOut: async () => {
        await AsyncStorage.setItem('isSigned', JSON.stringify(false));
        await AsyncStorage.setItem('user', JSON.stringify(null));
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        isSigned: state.isSigned,
        isLoading: state.isLoading,
        user: state.user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
