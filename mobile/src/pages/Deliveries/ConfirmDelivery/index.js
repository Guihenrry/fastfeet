import React, {useRef, useState} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

import * as S from './styles';
import api from '~/services/api';

export default function ConfirmDelivery() {
  const cameraRef = useRef(null);
  const [pictureUri, setPictureUri] = useState('');
  const navigation = useNavigation();
  const {id} = useRoute().params;

  async function takePicture() {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setPictureUri(data.uri);
    }
  }

  async function handleSubmit() {
    if (!pictureUri) {
      Alert.alert(
        'Ops esqueceu da foto',
        'É preciso tirar uma foto para confirmar a entrega'
      );

      return;
    }

    try {
      // eslint-disable-next-line no-undef
      const dataFile = new FormData();

      dataFile.append('file', {
        type: 'image/jpg',
        uri: pictureUri,
        name: 'assignature.jpg',
      });

      await api.put(`/order/${id}/end`, dataFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Ops algo deu errado',
        'Não coseguimos confirmar a entrega tente novamente'
      );
    }
  }

  return (
    <S.Container>
      {pictureUri ? (
        <S.Preview source={{uri: pictureUri}} />
      ) : (
        <S.CameraWrraper>
          <S.Camera style={{flex: 1}} ref={cameraRef} captureAudio={false} />

          <S.TakeButton onPress={takePicture}>
            <Icon name="camera-alt" size={36} color="#FFF" />
          </S.TakeButton>
        </S.CameraWrraper>
      )}
      <S.SubmitButton onPress={handleSubmit}>Enviar</S.SubmitButton>
    </S.Container>
  );
}
