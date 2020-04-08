import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import * as S from './styles';
import api from '~/services/api';
import Button from '~/components/Button';

export default function ReportProblem() {
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {params} = useRoute();
  const {id} = params;

  async function handleSubmitProblem() {
    setLoading(true);

    try {
      await api.post(`delivery/${id}/problems`, {
        description,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ops algo deu errado', 'Não conseguimos enviar um problema');
    }

    setLoading(false);
  }

  return (
    <S.Container>
      <S.TextArea
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        value={description}
        onChangeText={setDescription}
      />
      <Button onPress={handleSubmitProblem} loading={loading}>
        Enviar
      </Button>
    </S.Container>
  );
}
