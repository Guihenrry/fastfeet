import React, {useState, useEffect} from 'react';
import {format, parseISO} from 'date-fns';
import {useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';

import api from '~/services/api';
import * as S from './styles';

export default function ViewProblem() {
  const [problems, setProblems] = useState([]);
  const {id} = useRoute().params;

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get(`delivery/${id}/problems`);
        setProblems(response.data);
      } catch (error) {
        Alert.alert(
          'Ops algo deu errado',
          'Não  conseguimos buscar os problemas'
        );
      }
    }

    loadProblems();
  }, []);

  return (
    <S.Container>
      <S.Title>Encomenda {id}</S.Title>
      {problems.map((problem) => (
        <S.Problem key={problem.id}>
          <S.ProblemDescription>{problem.description}</S.ProblemDescription>
          <S.ProblemDate>
            {format(parseISO(problem.createdAt), 'dd/MM/yyyy')}
          </S.ProblemDate>
        </S.Problem>
      ))}
    </S.Container>
  );
}
